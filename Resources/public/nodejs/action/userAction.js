var
    core         = require('../core'),
    redis        = require('redis'),
    redisManager = require('../manager/redisManager');

module.exports = {
    loaded: function (socket, user) {
        'use strict';

        var appUser = {
            username     : user.username,
            token        : user.token,
            socket_id    : socket.id,
            last_refresh : (new Date()).getTime()
        };

        redisManager.deleteUserKeys("user:" + user.username + "_*");
        redisManager.addUser("user:" + appUser.username + "_" + appUser.socket_id, appUser);
    },
    disconnect: function (socket) {
        redisManager.deleteUserKeys("user:[A-z,0-9]*_" + socket.id);
    }
};

