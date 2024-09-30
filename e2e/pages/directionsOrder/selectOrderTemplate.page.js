const { I } = inject();

module.exports = {
  fields: {
    label: '//h3[contains(text(), "Which template do you wish to use?")]',
    dropdown: '#finalOrderDownloadTemplateOptions',
  },

  async selectTemplateByText(optionText) {
    I.seeElement(this.fields.label);
    I.see('Which template do you wish to use?', this.fields.label);
    I.selectOption(this.fields.dropdown, optionText);
    I.seeInField(this.fields.dropdown, optionText);
    await I.clickContinue();
  }
};
