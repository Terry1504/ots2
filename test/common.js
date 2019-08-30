'use strict';

var ots = require('../');

var options = {
  accessKeyID: '<YOUR ACCESSKEYID>',
  accessKeySecret: '<YOUR ACCESSKEYSECRET>',
  instance: '<YOUR INSTANCE>',
  region: '<YOUR REGION>'
};

try { // 覆盖
  options = require('./config');
} catch (ex) {
  // ignore
}

module.exports = ots.createClient(options);
