const { I } = inject();

class RetrieveCasePage {

  constructor() {

    //insert your locators
    // this.button = '#button'
  }
  // insert your methods here

  async getCase(caseId: string){
    await I.waitForText('My work', 60);
    await I.fillField('#exuiCaseReferenceSearch', caseId);
    await I.click('Find');
  }
}

// For inheritance
//module.exports = new loginPage();
export = RetrieveCasePage;
