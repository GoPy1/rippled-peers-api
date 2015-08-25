var config = require("nconf")

config.env()

config.defaults({
  "PEERS_API": "http://10.30.72.248:1234"
})

module.exports = config

