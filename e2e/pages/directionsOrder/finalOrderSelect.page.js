const { I } = inject();

module.exports = {
  fields: {
    finalOrderSelection: {
      label: '//h3[contains(text(), "What type of order do you wish to make?")]',
      assistedOrder: '#finalOrderSelection-ASSISTED_ORDER',
      freeFormOrder: '#finalOrderSelection-FREE_FORM_ORDER',
      downloadOrderTemplate: '#finalOrderSelection-DOWNLOAD_ORDER_TEMPLATE'
    }
  },

  async selectOrder(orderType) {
    I.seeElement(this.fields.finalOrderSelection.label);
    I.see('What type of order do you wish to make?', this.fields.finalOrderSelection.label);
    if (orderType === 'Assisted order') {
      I.click(this.fields.finalOrderSelection.assistedOrder);
      I.seeCheckboxIsChecked(this.fields.finalOrderSelection.assistedOrder);
    } else if (orderType === 'Free form order') {
      I.click(this.fields.finalOrderSelection.freeFormOrder);
      I.seeCheckboxIsChecked(this.fields.finalOrderSelection.freeFormOrder);
    } else if (orderType === 'Download order template') {
      I.click(this.fields.finalOrderSelection.downloadOrderTemplate);
      I.seeCheckboxIsChecked(this.fields.finalOrderSelection.downloadOrderTemplate);
    } else {
      throw new Error(`Invalid order type: ${orderType}`);
    }
    await I.clickContinue();
  }
};
