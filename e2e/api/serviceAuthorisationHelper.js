const restHelper = require('./restHelper');
const config = require('../config');
const totp = require('totp-generator');
const {TOTP} = require('totp-generator');
const {s2sForXUI, s2s} = require('../config');

const getS2sToken = async ({microservice, secret}) => {
 return restHelper.retriedRequest(
    `${config.url.authProviderApi}/lease`,
    {'Content-Type': 'application/json'},
    {
      microservice: microservice,
      oneTimePassword: TOTP.generate(secret).otp
      //oneTimePassword: totp(secret)
    })
    .then(response => response.text());
 // return '';
};

module.exports = {
  civilServiceAuth: ()  => {
    return getS2sToken(s2s);
  },
  xuiAuth: ()  => {
    return getS2sToken(s2sForXUI);
  },
};
