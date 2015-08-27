/**
 * GraphController
 *
 * @description :: Server-side logic for managing Graph
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `GraphController.index()`
   *
   * @api {get} /graph Json represeting of graph of latest crawl
   * @apiName getGraph
   * @apiGroup Graph
   *
   * @apiSuccess {Array} node Array of node (peer) objects
   * @apiSuccess {String} node.public_key public key of rippled node
   * @apiSuccess {String} node.ipp ip address of rippled node
   * @apiSuccess {Integer} node.in number of inbound tcp connections of the rippled
   * @apiSuccess {Integer} node.out number of outbound tcp connects of the rippled
   * @apiSuccess {String} node.version rippled version of the peer node
   * @apiSuccess {Integer} node.uptime number of seconds the peer node has been online
  */

  index: function (req, res) {

    GraphService.listGraph().then(function(graph) {

      return res.json(graph);
    })
  }
};
