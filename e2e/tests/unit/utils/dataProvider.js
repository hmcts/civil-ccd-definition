const load = require;
const fs = require('fs');
const path = require('path');

const loadFile = file => {
  return Object.assign(load(`../../../../ccd-definition/${file}.json`), []);
};

let getFileData = [];
let processDir = [];

let fieldsArray = [];
getFileData = (filePath, withConfig) => {
  fieldsArray = [];
  processDir(filePath, withConfig);
  return fieldsArray;
};

processDir = (filePath, withConfig) => {
  const fileNames = fs.readdirSync(path.resolve(__dirname, filePath));
  if (!Object.prototype.toString.call(fileNames) === '[object Array]') {
    const currentObject = path.resolve(__dirname, `${filePath}/${fileNames}`);
    const stat = fs.statSync(currentObject);
    if (stat.isFile() && !fileNames.filter(name => ['-HNL-nonprod.json', 'CUI.json'].includes(name)).length > 0) {
      // if prod, exclude nonprod files
      if (withConfig === '-prod.json') {
        if (!fileNames.includes('-nonprod.json')) {
          const content = Object.assign(load(currentObject), []);
          fieldsArray = [...fieldsArray, ...content];
        }
      } else {
        if (!fileNames.includes('-prod.json')) {
          const content = Object.assign(load(currentObject), []);
          fieldsArray = [...fieldsArray, ...content];
        }
      }
    } else if (stat.isDirectory()) {
      processDir(currentObject, withConfig);
    }
  } else {
    fileNames.forEach(filename => {
      const currentObject = path.resolve(__dirname, `${filePath}/${filename}`);
      const stat = fs.statSync(currentObject);
      if (stat.isFile() && !(['CUI.json'].filter(ext => filename.includes(ext)).length > 0)) {
        if (withConfig === '-prod.json') {
          if (!filename.includes('-nonprod.json')) {
            const content = Object.assign(load(currentObject), []);
            if (Object.prototype.toString.call(content) === '[object Array]') {
              fieldsArray = [...fieldsArray, ...content];
            }
          }
        } else {
          if (!filename.includes('-prod.json')) {
            const content = Object.assign(load(currentObject), []);
            if (Object.prototype.toString.call(content) === '[object Array]') {
              fieldsArray = [...fieldsArray, ...content];
            }
          }
        }
      } else if (stat.isDirectory()) {
        processDir(currentObject, withConfig);
      }
    });
  }
};

module.exports = {
  ccdData: {
    Banner: loadFile('Banner'),
    CaseRoles: loadFile('CaseRoles'),
    CaseType: loadFile('CaseType'),
    Jurisdiction: loadFile('Jurisdiction'),
    SearchCasesResultFields: loadFile('SearchCasesResultFields'),
    SearchInputFields: loadFile('SearchInputFields'),
    SearchResultFields: loadFile('SearchResultFields'),
    State: loadFile('State'),
    UserProfile: loadFile('UserProfile'),
    WorkBasketInputFields: loadFile('WorkBasketInputFields'),
    WorkBasketResultFields: loadFile('WorkBasketResultFields')
  },
  caseFieldata: getFileData('../../../../ccd-definition/CaseField', '-prod.json'),
  AuthorisationCaseType: getFileData('../../../../ccd-definition/AuthorisationCaseType', '-prod.json'),
  AuthorisationCaseFieldData: getFileData('../../../../ccd-definition/AuthorisationCaseField', '-prod.json'),
  AuthorisationCaseState: getFileData('../../../../ccd-definition/AuthorisationCaseState', '-prod.json'),
  CaseEventToFieldData: getFileData('../../../../ccd-definition/CaseEventToFields', '-prod.json'),
  CaseTypeTab: getFileData('../../../../ccd-definition/CaseTypeTab', '-prod.json'),
  CaseEvent: getFileData('../../../../ccd-definition/CaseEvent', '-prod.json'),
  AuthorisationCaseEvent: getFileData('../../../../ccd-definition/AuthorisationCaseEvent', '-prod.json'),
  CaseEventToComplexTypes: getFileData('../../../../ccd-definition/CaseEventToComplexTypes', '-prod.json'),
  ComplexTypes: getFileData('../../../../ccd-definition/ComplexTypes', '-prod.json')
};
