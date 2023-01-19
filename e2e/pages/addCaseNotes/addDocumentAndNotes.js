const { I } = inject();

module.exports = {

  fields: {
    documentAndNote: {
      id: '#documentAndNote',
      fragment: {
        button: 'Add new',
        name: '#documentAndNote_0_documentName',
        document: '#documentAndNote_0_document',
        note: '#documentAndNote_0_documentNote'
      }
    },
  },

  async addDocumentAndNotes (file) {
    await I.runAccessibilityTest();
    I.waitForElement(this.fields.documentAndNote.id);
    await within(this.fields.documentAndNote.id, () => {
      I.click(this.fields.documentAndNote.fragment.button);
      I.fillField(this.fields.documentAndNote.fragment.name, 'Doc 1');
      I.attachFile(this.fields.documentAndNote.fragment.document, file);
      I.fillField(this.fields.documentAndNote.fragment.note, 'Test Note');
    });
    await I.clickContinue();
  },
};
