import http from 'superagent'

module.exports = {

  listGraph: function() {

    return new Promise((resolve, reject) => {

      http
        .get(`${Config.get('PEERS_API')}/graph`)
        .end(function(error, response) {
          if (error) {
            reject(error)
          } else {
            resolve(response.body);
          }
        })
    })
  }
}
