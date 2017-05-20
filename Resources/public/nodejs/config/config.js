const nconf = require('nconf'),
      fs    = require('fs');

const user_config_path = __dirname + '/../../../app/js/acknotification/config.json';
const bundle_config_path = __dirname + '/config.json';
var config = null;

if (fs.existsSync(user_config_path)) {
    config = nconf.file(user_config_path);
}
else {
    config = nconf.file(bundle_config_path);
}
module.exports = config;