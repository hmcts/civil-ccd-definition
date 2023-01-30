const load = require;
const fs = require('fs');
const path = require('path');

const loadFile = file => {
  return Object.assign(load(`../../../../ccd-definition/${file}.json`), []);
};

// Please update this map whenever exclusions are updated in build-release-definition.sh
const exclusions = new Map([
  ['preview', ['-prod.json','HNL-nonprod.json','CUI.json','CUI-nonprod.json','-GAR2GAspec-nonprod.json']],
  ['previewHNL', ['-prod.json','-base-nonprod.json','CUI.json','CUI-nonprod.json']],
  ['previewGA', ['-prod.json','HNL-nonprod.json','CUI.json','CUI-nonprod.json']],
  ['demo', ['UserProfile.json','-prod.json','-HNL-nonprod.json','-GAR2GAspec-nonprod.json','-CUI-nonprod.json']],
  // ['local', ['-prod.json']], upload doesn't currently work with this command due to SDO and SDO-HNL files
  ['prod', ['UserProfile.json','-nonprod.json','-COS-nonprod.json','GAspec.json','-GAR2GAspec-nonprod.json','DJ.json','DJspec.json','DJ-SDO-nonprod.json','DJ-nonprod.json','-HNL-nonprod.json','CUI.json','CUI-nonprod.json']],
  ['default', ['UserProfile.json','GAspec.json','-GAR2GAspec-nonprod.json','-prod.json','-HNL-nonprod.json','CUI.json','CUI-nonprod.json']]
]);

const ccdData = {
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
};

function getConfig(path, env) {
  return getFileData(path, env);
}

let getFileData = [];
let processDir = [];

let fieldsArray = [];
getFileData = (filePath, env) => {
  fieldsArray = [];
  processDir(filePath, env);
  return fieldsArray;
};

processDir = (filePath, withConfig) => {
  const fileNames = fs.readdirSync(path.resolve(__dirname, filePath));
  if (!Object.prototype.toString.call(fileNames) === '[object Array]') {
    const currentObject = path.resolve(__dirname, `${filePath}/${fileNames}`);
    const stat = fs.statSync(currentObject);
    if (stat.isFile()) {
      if (!(exclusions.get(withConfig).filter(ext => fileNames.includes(ext)).length > 0)) {
        const content = Object.assign(load(currentObject), []);
        fieldsArray = [...fieldsArray, ...content];
      }
    } else if (stat.isDirectory()) {
      processDir(currentObject, withConfig);
    }
  } else {
    fileNames.forEach(filename => {
      const currentObject = path.resolve(__dirname, `${filePath}/${filename}`);
      const stat = fs.statSync(currentObject);
      if (stat.isFile()) {
        if (filename === ('UserEventsDJ.json')) {
          console.log('');
        }
        if (!(exclusions.get(withConfig).filter(ext => filename.includes(ext)).length > 0)) {
          const content = Object.assign(load(currentObject), []);
          if (Object.prototype.toString.call(content) === '[object Array]') {
            fieldsArray = [...fieldsArray, ...content];
          } else {
            fieldsArray.push(content);
          }
        }
      } else if (stat.isDirectory()) {
        processDir(currentObject, withConfig);
      }
    });
  }
};

module.exports = {
  getConfig,
  exclusions,
  ccdData
};
