const load = require;
const fs = require('fs');
const path = require('path');

const loadFile = file => {
  return Object.assign(load(`../../../definitions/private-law/json/${file}.json`), []);
};

let getFieldata = [];
let processDir = [];

let fieldsArray = [];
getFieldata = (filePath, fileType) => {
  fieldsArray = [];
  processDir(filePath, fileType);
  return fieldsArray;
};

processDir = (filePath, fileType) => {
  const fileNames = fs.readdirSync(path.resolve(__dirname, filePath));
  if (!Object.prototype.toString.call(fileNames) === '[object Array]') {
    const currentObject = path.resolve(__dirname, `${filePath}/${fileNames}`);
    const stat = fs.statSync(currentObject);
    if (stat.isFile()) {
      if (fileNames === fileType) {
        const content = Object.assign(load(currentObject), []);
        fieldsArray = [...fieldsArray, ...content];
      }
    } else if (stat.isDirectory()) {
      processDir(currentObject, fileType);
    }
  } else {
    fileNames.forEach(filename => {
      const currentObject = path.resolve(__dirname, `${filePath}/${filename}`);
      const stat = fs.statSync(currentObject);
      if (stat.isFile()) {
        if (filename === fileType) {
          const content = Object.assign(load(currentObject), []);
          if (Object.prototype.toString.call(content) === '[object Array]') {
            fieldsArray = [...fieldsArray, ...content];
          }
        }
      } else if (stat.isDirectory()) {
        processDir(currentObject, fileType);
      }
    });
  }
};

module.exports = {
  ccdData: {
    AuthorisationCaseState: loadFile('AuthorisationCaseState'),
    AuthorisationCaseType: loadFile('AuthorisationCaseType'),
    CaseEvent: loadFile('CaseEvent'),
    CaseRoles: loadFile('CaseRoles'),
    CaseType: loadFile('CaseType'),
    FixedLists: loadFile('FixedLists'),
    Jurisdiction: loadFile('Jurisdiction'),
    SearchInputFields: loadFile('SearchInputFields'),
    SearchResultFields: loadFile('SearchResultFields'),
    State: loadFile('State'),
    UserProfile: loadFile('UserProfile'),
    WorkBasketInputFields: loadFile('WorkBasketInputFields'),
    WorkBasketResultFields: loadFile('WorkBasketResultFields')
  },
  caseFieldata: getFieldata('../../../definitions/private-law/json', 'CaseField.json'),
  AuthorisationCaseFieldData: getFieldata('../../../definitions/private-law/json', 'AuthorisationCaseField.json'),
  CaseEventToFieldData: getFieldata('../../../definitions/private-law/json', 'CaseEventToFields.json'),
  CaseTypeTab: getFieldata('../../../definitions/private-law/json', 'CaseTypeTab.json'),
  AuthorisationCaseEvent: getFieldata('../../../definitions/private-law/json', 'AuthorisationCaseEvent.json'),
  CaseEventToComplexTypes: getFieldata('../../../definitions/private-law/json', 'CaseEventToComplexTypes.json'),
  ComplexTypes: getFieldata('../../../definitions/private-law/json', 'ComplexTypes.json')
};