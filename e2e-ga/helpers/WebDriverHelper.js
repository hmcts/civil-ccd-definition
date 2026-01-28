'use strict';

// eslint-disable-next-line no-undef
const Helper = codecept_helper;
class WebDriverHelper extends Helper {

  async waitForNavigationToComplete(locator, webDriverWait = 7) {
    const helper = this.helpers.WebDriver;

    if (locator) {
      await helper.waitForClickable(locator, 30);
      await helper.click(locator);
    }
    await helper.wait(webDriverWait);
  }

  async clickTab(tabTitle) {
    const helper = this.helpers.WebDriver;
    const tabXPath = `//div[text()='${tabTitle}']`;
    const elements = await helper._locateClickable(tabXPath);
    const selector = elements[0].selector;

    helper.executeScript(function (el) {
      (
        function(expression, parentElement) {
          const r = [];
          const x = document.evaluate(expression, parentElement ||
            document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
          for (let i = 0, l = x.snapshotLength; i < l; i++) {
            r.push(x.snapshotItem(i));
          }
          return r;
        }
      )(el)[0].click();
    }, selector);
  }
}

module.exports = WebDriverHelper;
