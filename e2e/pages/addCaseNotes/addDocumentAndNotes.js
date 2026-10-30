const { I } = inject();

module.exports = {

  fields: {
    documentAndNoteToAdd: {
      id: '#documentAndNoteToAdd',
      fragment: {
        button: 'Add new',
        name: '#documentAndNoteToAdd_0_documentName',
        document: '#documentAndNoteToAdd_0_document',
        note: '#documentAndNoteToAdd_0_documentNote'
      }
    },
  },

  async addDocumentAndNotes (file) {
    await I.runAccessibilityTest();
    I.waitForElement(this.fields.documentAndNoteToAdd.id);
    await within(this.fields.documentAndNoteToAdd.id, () => {
      I.click(this.fields.documentAndNoteToAdd.fragment.button);
      I.fillField(this.fields.documentAndNoteToAdd.fragment.name, 'Doc 1');
      I.attachFile(this.fields.documentAndNoteToAdd.fragment.document, file);
      I.fillField(this.fields.documentAndNoteToAdd.fragment.note, 'Test Note');
    });
    await I.usePlaywrightTo('wait for document upload', async ({ page }) => {
      const input = page.locator('#documentAndNoteToAdd_0_document');

      await input.waitFor({ state: 'attached', timeout: 30000 });

      await page.waitForFunction(() => {
        const el = document.querySelector('#documentAndNoteToAdd_0_document');
        return el && el.files && el.files.length > 0;
      }, null, { timeout: 30000 });

      await page.waitForTimeout(5000);
    });

    await I.click('Continue');
    await I.waitForText('Check your answers', 30);
  },
};
