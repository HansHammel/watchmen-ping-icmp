const ping = require ('net-ping');
const validator = require('validator');
const dns = require('dns');
var session = ping.createSession();

function PingService() {
}

function resolve(address,cb){

  if(validator.isIP(address)){
    return cb(null,address);
  }

  dns.lookup(address, cb);

}

exports = module.exports = PingService;

PingService.prototype.ping = function (service, callback) {

  //remove protocol (ie: http://) from address
  var url = service.url.replace(/.*?:\/\//g, "");

  resolve(url, function(err,addresses){

    if (err){
      return callback(err.toString(), url, "dns error", 0);
    }

    var startTime = Date.now();

    session.pingHost(addresses, function (err, target) {
      if (err){
        return callback(err.toString(), target, "icmp error", Date.now() - startTime);
      } else{
        callback(null, target, "icmp alive", Date.now() - startTime);
      }
    });

  });

};

PingService.prototype.getDefaultOptions = function () {
  return {};
};