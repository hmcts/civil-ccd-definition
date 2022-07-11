const { listElement } = require('../../api/dataHelper');
const config = require("../../config.js");


module.exports = {
  valid: {
    defendantDetailsSpec: {
      defendantDetailsSpec: {
        value: {
          code: '62ff8ded-ab50-47a6-894e-c101fb56a89f',
          label: 'Sir John Doe'
        },
        list_items: [
          {
            code: '62ff8ded-ab50-47a6-894e-c101fb56a89f',
            label: 'Sir John Doe'
          }
        ]
      },
      bothDefendants: 'One'
    }
  }
};
