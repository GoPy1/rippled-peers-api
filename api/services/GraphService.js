var HbaseClient = require('crawler-hbase').Client;
var utils = require('crawler-hbase').utils;

module.exports = {

  listGraph: function() {
    var hbaseClient = new HbaseClient(Config.get('HBASE_URL'));
    function graphify(crawlKey) {
      return new Promise((resolve, reject) => {
        var results = {nodes: [], links: []};
        Promise.all([
          hbaseClient.getCrawlNodeStats(crawlKey),
          hbaseClient.getAllConnections(crawlKey)
        ])
        .then(function(retArray) {
          var rippleds = retArray[0];
          var links = retArray[1];
          var pkToIndex = {};
          _.each(rippleds, function(r) {
            pkToIndex[r.pubkey] = results.nodes.length;
            var node = {
              'version': r.version,
              'uptime': parseInt(r.uptime),
              'in': parseInt(r.in_count),
              'out': parseInt(r.out_count),
              'public_key': r.pubkey,
              'in_add_count': parseInt(r.in_add_count),
              'out_add_count': parseInt(r.out_add_count),
              'in_drop_count': parseInt(r.in_drop_count),
              'out_drop_count': parseInt(r.out_drop_count),
              'ipp': r.ipp,
            };
            results.nodes.push(node);
          });
          _.each(links, function(l) {
            var sIndex = pkToIndex[utils.getSourceByConnectionKey(l.rowkey)];
            var tIndex = pkToIndex[utils.getTargetByConnectionKey(l.rowkey)];
            if (sIndex !== undefined && tIndex !== undefined) {
              var newlink = {};
              newlink.source = sIndex;
              newlink.target = tIndex;
              newlink.value = 1;
              results.links.push(newlink);
            }
          });
          return resolve(results);
        })
        .catch(reject);
      });
    }

    return hbaseClient.getCrawlInfo().then(crawlInfo => {
      return graphify(crawlInfo.rowkey);
    });
  }
}
