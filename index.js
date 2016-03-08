const ping = require('./ping');
const validator = require('validator');
const dns = require('dns');

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

  resolve(url, function(err,ip){

    if (err){
      return callback(err.toString(), url, "dns error", 0);
    }

    ping.probe(ip,function(err,result,data,time){
      if (err || !data){
        return callback(err.toString(), ip, "icmp error", time);
      } else{
        callback(null, ip, "icmp alive", time);
      }
    });

  });

};

PingService.prototype.getDefaultOptions = function () {
  return {};
};