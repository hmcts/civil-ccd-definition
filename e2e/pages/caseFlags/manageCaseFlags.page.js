const {I} = inject();

const fields = {
  flagLocationSelection: {
    id: 'fieldset[aria-describedby=\'manage-case-flag-heading\']',
    radioGroup: {
      id: '#conditional-radios-list',
    }
  },
  commentInput: {
    id: 'textarea[aria-describedby=\'update-flag-hint update-flag-char-limit-info update-flag-char-limit-error\']'
  },
  next: {
    id: 'Next'
  }
};

module.exports = {
  async selectFlagLocation(flagLocation) {
    I.waitForElement(fields.flagLocationSelection.id);
    await within(fields.flagLocationSelection.radioGroup.id, () => {
      I.click(flagLocation);
    });
    I.click(fields.next.id);
  },

  async updateFlagComment(comment) {
    I.waitForElement(fields.commentInput.id);
    I.fillField(fields.commentInput.id, comment);
    I.click('Make inactive');
    I.click(fields.next.id);
  }
};
