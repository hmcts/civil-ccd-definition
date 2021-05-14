const {I} = inject();

module.exports = {

    async takeCaseOffline() {
      I.waitForText('Take offline');
      I.click('Take offline');
    }

};
