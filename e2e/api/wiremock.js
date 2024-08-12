const restHelper = require('./restHelper');
const {url} = require('../config');

const wireMockUrl = `${url.wiremockService}/__admin/mappings`;
const headers = {
  'Content-Type': 'application/json'
};

const getStubs = async () => {
  return restHelper.request(
    wireMockUrl, null, null, 'GET', 200)
    .then(async response => {
      const content = await response.json();
      return content.mappings;
    });
};

const getStub = async (stubUrl) => {
  const allStubs = await getStubs();
  return allStubs.find(stub => stub.request.urlPath == stubUrl);
};

const getStubByRequestUrl = async (stubRequestUrl) => {
  const targetStub = await getStub(stubRequestUrl);
  if (targetStub == null) {
   console.log(`Could not locate stub for: ${stubRequestUrl} request url`);
  }
  return targetStub;
};

const updateStubById = async (stubId, mappingContent) => {
  return restHelper.request(
    `${wireMockUrl}/${stubId}`, headers, mappingContent, 'PUT', 200)
    .then(response => {
      response.json();
    });
};
const createStub = async (mappingContent) => {
  return restHelper.request(
    `${wireMockUrl}`, {}, mappingContent, 'POST');
};

const createUpdateStub = async (mappingContent) => {
  const existingStub = await getStub(mappingContent.request.url || mappingContent.request.urlPath);
  return existingStub ?
    await updateStubBodyByRequestUrl(existingStub.request.url, mappingContent.response.body)
    : await createStub(mappingContent);
};

const updateStubResponseFileByRequestUrl = async (stubRequestUrl, bodyFileName) => {
  return getStubByRequestUrl(stubRequestUrl)
    .then(stub => updateStubById(stub.id, {
        ...stub,
        response: {
          ...stub.response,
          bodyFileName
        }
      })
    );
};

const updateStubBodyByRequestUrl = async (stubRequestUrl, body) => {
  return getStubByRequestUrl(stubRequestUrl)
    .then(stub => stub ? updateStubById(stub.id, {
        ...stub,
        response: {
          ...stub.response,
          body
        }
      }): null
    );
};

const updateStubResponseByRequestUrl = async (stubRequestUrl, responseContent) => {
  return getStubByRequestUrl(stubRequestUrl)
    .then(stub => updateStubById(stub.id, {
        ...stub,
        response: {
          ...stub.response,
          bodyFileName: null,
          body: responseContent
        }
      })
    );
};

module.exports = {
  getStubs,
  createStub,
  createUpdateStub,
  getStubByRequestUrl,
  updateStubById,
  updateStubResponseFileByRequestUrl,
  updateStubResponseByRequestUrl
};
