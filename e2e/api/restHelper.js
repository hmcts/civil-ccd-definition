

const fetch = require('node-fetch');
const https = require('https');

const {retry} = require('./retryHelper');

const httpsAgent = new https.Agent({ keepAlive: false });

const isHttpsUrl = (url) => typeof url === 'string' ? url.startsWith('https:') : url.protocol === 'https:';

const request = (url, headers, body, method = 'POST') =>  fetch(url, {
    method: method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      ...headers,
      'Accept-Encoding': 'identity'
    },
    compress: false,
    agent: isHttpsUrl(url) ? httpsAgent : undefined
  });

const retriedRequest = async (url, headers, body, method = 'POST', expectedStatus = 200) => {
  return retry(() => {
    return request(url, headers, body, method).then(response => {
      if (response.status !== expectedStatus) {
        throw new Error(`Expected status: ${expectedStatus}, actual status: ${response.status}, `
          + `message: ${response.statusText}, url: ${response.url}`);
      }
      return response;
    });
  });
};

const retriedJsonRequest = async (url, headers, body, method = 'POST', expectedStatus = 200) => {
  return retry(() => {
    return request(url, headers, body, method).then(async response => {
      if (response.status !== expectedStatus) {
        throw new Error(`Expected status: ${expectedStatus}, actual status: ${response.status}, `
          + `message: ${response.statusText}, url: ${response.url}`);
      }

      const responseBody = await response.json();
      return {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        headers: response.headers,
        json: async () => responseBody,
        text: async () => JSON.stringify(responseBody)
      };
    });
  });
};

const retriedRequestFor201 = async (url, headers, body, method = 'POST', expectedStatus = 201) => {
  return retry(() => {
    return request(url, headers, body, method).then(response => {
      if (response.status !== expectedStatus) {
        throw new Error(`Expected status: ${expectedStatus}, actual status: ${response.status}, `
          + `message: ${response.statusText}, url: ${response.url}`);
      }
      return response;
    });
  });
};

const retriedRequestFor400 = async (url, headers, body, method = 'POST', expectedStatus = 400) => {
  return retry(() => {
    return request(url, headers, body, method).then(response => {
      if (response.status !== expectedStatus) {
        throw new Error(`Expected status: ${expectedStatus}, actual status: ${response.status}, `
          + `message: ${response.statusText}, url: ${response.url}`);
      }
      return response;
    });
  });
};

module.exports = {request, retriedRequest, retriedJsonRequest, retriedRequestFor400, retriedRequestFor201};
