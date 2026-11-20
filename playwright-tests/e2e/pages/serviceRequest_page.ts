const { I } = inject();

class ServiceRequestPage {

  constructor() {


    //insert your locators
    // this.button = '#button'
  }
  // insert your methods here

  async createServiceRequest(){
    await I.selectNextStep('Create a service request');
    await I.waitForText('Next step - payment', 60);
    await I.runAccessibilityCheck('CreateServiceRequestPage');
    await I.clickSubmit();
    await I.waitForText('You have created a service request', 60);
    await I.clickCloseAndReturnToCaseDetails();
  }
}

// For inheritance
//module.exports = new serviceRequestPage();
export = ServiceRequestPage;
