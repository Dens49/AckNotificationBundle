const color  = require('colors'),
      config = require('../config/config');

module.exports = {
    log: function(message, type) {
        var type = typeof type === 'undefined' ? null : type;

        if (config.get('config:verbose')) {
            if (type === 'success') {
                console.log(color.italic.green(message));
            } else if (type === 'error') {
                console.log(color.italic.red(message));
            } else if (type === 'notice') {
                console.log(color.italic.yellow(message));
            } else if (type === 'info') {
                console.log(color.italic.cyan(message));
            } else if (type === 'default') {
                console.log(color.italic(message));
            } else {
                console.log(color.italic(message));
            }
        }
    }
};