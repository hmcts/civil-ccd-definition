const testingSupport = require("./testingSupport");
const apiRequest = require("./apiRequest.js");
const config = require("../config.js");
const expectedEvents = require("../fixtures/ccd/expectedEvents.js");
const lodash = require("lodash");
const assert = require('./assertHelper');

const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');

chai.use(deepEqualInAnyOrder);

module.exports = {
  validateEventPages,
  deleteCaseFields,
  addMidEventFields,
  removeUuidsFromDynamicList,
  updateCaseDataWithPlaceholders
}

validateEventPages = async (data, solicitor) => {
  //transform the data
  console.log('validateEventPages');
  for (let pageId of Object.keys(data.valid)) {
    if (pageId === 'Upload' || pageId === 'DraftDirections'|| pageId === 'ApplicantDefenceResponseDocument' || pageId === 'DraftDirections') {
      const document = await testingSupport.uploadDocument();
      data = await updateCaseDataWithPlaceholders(data, document);
    }
    // data = await updateCaseDataWithPlaceholders(data);
    await assert.validData(data, pageId, solicitor);
  }
};

// assert
deleteCaseFields = (...caseFields) => {
  caseFields.forEach(caseField => delete caseData[caseField]);
};

function addMidEventFields(eventName, mpScenario, midEventFieldForPage, pageId, responseBody) {
  console.log(`Adding mid event fields for pageId: ${pageId}`);
  const midEventField = midEventFieldForPage[pageId];
  let midEventData;

  if(eventName === 'CREATE_CLAIM'){
    midEventData = data[eventName](mpScenario).midEventData[pageId];
  } else {
    midEventData = data[eventName].midEventData[pageId];
  }

  if (midEventField.dynamicList === true) {
    assertDynamicListListItemsHaveExpectedLabels(responseBody, midEventField.id, midEventData);
  }

  caseData = {...caseData, ...midEventData};
  responseBody.data[midEventField.id] = caseData[midEventField.id];
}

function removeUuidsFromDynamicList(data, dynamicListField) {
  const dynamicElements = data[dynamicListField].list_items;
  // eslint-disable-next-line no-unused-vars
  return dynamicElements.map(({code, ...item}) => item);
}

function assertDynamicListListItemsHaveExpectedLabels(responseBody, dynamicListFieldName, midEventData) {
  const actualDynamicElementLabels = removeUuidsFromDynamicList(responseBody.data, dynamicListFieldName);
  const expectedDynamicElementLabels = removeUuidsFromDynamicList(midEventData, dynamicListFieldName);

  expect(actualDynamicElementLabels).to.deep.equalInAnyOrder(expectedDynamicElementLabels);
}

async function updateCaseDataWithPlaceholders(data, document) {
  const placeholders = {
    TEST_DOCUMENT_URL: document.document_url,
    TEST_DOCUMENT_BINARY_URL: document.document_binary_url,
    TEST_DOCUMENT_FILENAME: document.document_filename
  };

  data = lodash.template(JSON.stringify(data))(placeholders);

  return JSON.parse(data);
}
