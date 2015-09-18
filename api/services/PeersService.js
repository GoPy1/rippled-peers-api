import http from 'superagent'
var HbaseClient = require('crawler-hbase').Client;

module.exports = {

  listPeers: function() {
    var hbaseClient = new HbaseClient(Config.get('HBASE_URL'))
    return new Promise((resolve, reject) => {
      hbaseClient.getCrawlInfo()
      .then(function(crawlInfo) {
        var key = crawlInfo.rowkey;
        return hbaseClient.getCrawlNodeStats(key)
      })
      .then(function(nodeStats) {
        return resolve(_.map(nodeStats, function(r) {
          return {
            'version': r.version,
            'uptime': parseInt(r.uptime),
            'inbound_connections': parseInt(r.in_count),
            'outbound_connections': parseInt(r.out_count),
            'public_key': r.pubkey,
            'in_add_count': parseInt(r.in_add_count),
            'out_add_count': parseInt(r.out_add_count),
            'in_drop_count': parseInt(r.in_drop_count),
            'out_drop_count': parseInt(r.out_drop_count),
            'ip_address': r.ipp,
          };
        }));
      });
    });
  },
} 

