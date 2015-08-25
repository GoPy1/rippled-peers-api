import http from 'superagent'

module.exports = {

  listPeers: function() {

    return new Promise((resolve, reject) => {

      http
        .get(`${Config.get('PEERS_API')}/rippleds`)
        .end(function(error, response) {
          if (error) {
            reject(error)
          } else {

            resolve(_.map(response.body, peer => {
              return {
                public_key: peer.public_key,
                ip_address: peer.ipp,
                version: peer.version,
                uptime: peer.uptime,
                inbound_connections: peer.in,
                outbound_connections: peer.out
              }
            }))
          }
        })
    })
  }
} 

