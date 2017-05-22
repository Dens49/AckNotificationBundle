var
    config       = require('../config/config'),
    logger       = require('../util/logger'),
    redis        = require('redis'),
    redisManager = require('../manager/redisManager'),
    jwt          = require('jsonwebtoken'),
    fs           = require('fs');

module.exports = {
    loaded: function (socket, token) {
        'use strict';
        var error = false;
        var payload = undefined;

        try {
            payload = jwt.verify(token, fs.readFileSync(__dirname + '/' + config.get('jwt:public-key-path')));
        } catch (err) {
            error = err;
        }

        if (error === false) {
            // check if the role is allowed
            for (var role of config.get('jwt:allowed-roles')) {
                if (!payload.roles.includes(role)) {
                    error = {
                        "name": "RoleNotAllowedError",
                        "message": "The specified roles (" + payload.roles + ") are not supported."
                    };
                }
            }
        }

        if (error !== false) {
            socket.emit('failed', JSON.stringify(error));
        }
        else {
            var appUser = {
                username     : payload.username,
                socket_id    : socket.id,
                last_refresh : (new Date()).getTime()
            };

            redisManager.deleteUserKeys("user:" + appUser.username + "_*");
            redisManager.addUser("user:" + appUser.username + "_" + appUser.socket_id, appUser);
            socket.emit('successful');
        }
    },
    disconnect: function (socket) {
        redisManager.deleteUserKeys("user:[A-z,0-9]*_" + socket.id);
    }
};

