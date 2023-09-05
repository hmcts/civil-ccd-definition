const {I} = inject();

const fields = {
  flagLocationSelection: {
    id: 'fieldset[aria-describedby=\'flag-location-heading\']',
    radioGroup: {
      id: '#conditional-radios-list',
    }
  },
  flagSelection: {
    id: 'fieldset[aria-describedby=\'flag-type-heading\']',
    radioGroup: {
      id: '#conditional-radios-list',
    }
  },
  commentInput: {
    id: 'textarea[aria-describedby=\'add-comments-hint add-comments-char-limit-info add-comments-char-limit-error\']'
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

  async selectFlag(flag) {
    I.waitForElement(fields.flagSelection.id);
    await I.waitForText(flag, 15);
    await within(fields.flagSelection.radioGroup.id, () => {
      I.click(flag);
    });
    I.click(fields.next.id);
  },

  async inputFlagComment(comment) {
    I.waitForElement(fields.commentInput.id);
    I.fillField(fields.commentInput.id, comment);
    I.click(fields.next.id);
  }
};
