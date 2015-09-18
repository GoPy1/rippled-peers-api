var config = require('nconf')

config.env();

config.defaults({
  'HBASE_URL': '127.0.0.1:9090',
});


module.exports = config;

