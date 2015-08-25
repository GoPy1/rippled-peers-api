/**
 * PeersController
 *
 * @description :: Server-side logic for managing Peers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `PeersController.index()`
   *
   * @api {get} /peers List of all known peers from latest crawl
   * @apiName listPeers
   * @apiGroup Peers
   *
   * @apiSuccess {Array} peers Array of Peer objects
   * @apiSuccess {String} peer.public_key public key of rippled node
   * @apiSuccess {String} peer.ip_address ip address of rippled node
   * @apiSuccess {Integer} peer.inbound_connections number of outbound tcp connections of the rippled
   * @apiSuccess {Integer} peer.outbound_connections number of inbound tcp connects of the rippled
   * @apiSuccess {String} peer.version rippled version of the peer node
   * @apiSuccess {Integer} peer.uptime number of seconds the peer node has been online
  */

  index: function (req, res) {

    PeersService.listPeers().then(function(peers) {

      return res.json({
        peers: peers
      })
    })
  }
};

