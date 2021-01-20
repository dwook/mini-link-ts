require('dotenv').config();
const axios = require('axios');
const CryptoJS = require('crypto-js');

const access_key = process.env.NAVER_GEO_ACCESS_KEY;
const secret_key = process.env.NAVER_GEO_SECRET_KEY;

const requestMethod = 'GET';
const hostName = 'https://geolocation.apigw.ntruss.com';
const requestUrl = '/geolocation/v2/geoLocation';

exports.geoLocation = async (ip) => {
  const timeStamp = Math.floor(+new Date()).toString();
  const sortedSet = {};
  sortedSet['ip'] = ip;
  sortedSet['ext'] = 't';
  sortedSet['responseFormatType'] = 'json';

  let queryString = Object.keys(sortedSet).reduce((prev, curr) => {
    return prev + curr + '=' + sortedSet[curr] + '&';
  }, '');
  queryString = queryString.substr(0, queryString.length - 1);

  const baseString = requestUrl + '?' + queryString;

  const makeSignature = (
    secretKey,
    method,
    baseString,
    timestamp,
    accessKey
  ) => {
    const space = ' ';
    const newLine = '\n';
    let hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

    hmac.update(method);
    hmac.update(space);
    hmac.update(baseString);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
  };
  const signature = makeSignature(
    secret_key,
    requestMethod,
    baseString,
    timeStamp,
    access_key
  );

  const config = {
    headers: {
      'x-ncp-apigw-timestamp': timeStamp,
      'x-ncp-iam-access-key': access_key,
      'x-ncp-apigw-signature-v2': signature,
    },
  };

  try {
    const { data } = await axios.get(`${hostName}${baseString}`, config);
    console.log('데이터', data);
    return data;
  } catch (error) {
    console.log(error.response.data);
  }
};
