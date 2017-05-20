const nconf = require('nconf');
module.exports = nconf.file(__dirname + '/config.json');