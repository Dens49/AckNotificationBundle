var
    color                = require('colors'),
    io                   = require('socket.io'),
    util                 = require('util'),
    notificationListener = require('./listener/notificationListener'),
    config               = require('./config/config'),
    logger               = require('./util/logger.js');

function Core() {
    if (core) {
        return core;
    }

    this.config   = config;
    this.messages = [];

    core = this;

    this.prepareSocketIO = function () {
        io = io(this.config.get('network:port'));

        io.on('connection', function (socket) {
            'use strict';

            var socketActions = notificationListener.getSocketActions();

            for (var action in socketActions) {
                if (socketActions.hasOwnProperty(action)) {
                    socket.on(action, socketActions[action].bind(socketActions, socket));
                }
            }
        });
    };

    this.startSocketIO = function () {
        logger.log('Socket.io listening on ' + this.config.get('network:ip') + ':' + this.config.get('network:port'), 'success');
        notificationListener.listen(io);
    };

    this.dump = function(object, error) {
        if (this.config.get('config:trace')) {
            if (typeof error == "undefined") {
                console.log(util.inspect(object, false, null));
            } else {
                if (error === true) {
                    console.log(color.italic.red(util.inspect(object, false, null)));
                } else {
                    console.log(util.inspect(object, false, null));
                }
            }
        }
    };
}

// Singleton Core
var core = new Core();
module.exports = core;
