
const WDIO = require('./WDIO');
const elements = require('../selectors/elementsPage.selectors');

/**
 * Common options accepted by WDIO commands
 * @typedef {Object} WebDriverOptions
 * @property {number} timeout number of milliseconds to wait for condition. Defaults to 8000
 * @property {number} interval interval in milliseconds to check for condition. Defaults to 50
 * @property {string} timeoutMsg message to be thrown when condition is not satisfied within timeout
 * @property {boolean} reverse if true it waits for the opposite (default: false)
 */

class ElementsPage extends WDIO {

    /**
     * Clicks the Buttons link
     */
       async clickButtonsLink() {
        await WDIO.waitUntilDisplayed(elements.selector.buttonsLink);
        await WDIO.waitAndClick(elements.selector.buttonsLink);
    }

    /**
     * Clicks the Click Me button
     * @param {WebDriverOptions}
     */
        async clickMeButton() {
          await WDIO.waitUntilDisplayed(elements.selector.clickMeButton, { timeout: 20000 });
          await WDIO.waitAndClick(elements.selector.clickMeButton);
      }

    /**
     * Gets the text that appears after you click the Click Me button
     */
           async getSuccessText() {
              await WDIO.waitUntilDisplayed(elements.selector.clickMeText, { timeout: 20000 });
              const text = await WDIO.getText(elements.selector.clickMeText);
              return text;
        }

    /**
     * Clicks the Dynamic Properties link
     */
          async clickDynamicPropertiesLink() {
            await WDIO.waitUntilDisplayed(elements.selector.dyanmicPropertiesLink);
            await WDIO.waitAndClick(elements.selector.dyanmicPropertiesLink);
        }
  

    /**
     * Gets the text form the Visible After 5 Seconds button
     * @param {WebDriverOptions}
     */
          async getButtonAFterFiveSecondsText() {
            await WDIO.waitUntilDisplayed(elements.selector.visibleAfterFiveSecondsButton, { timeout: 40000 });
            const text = await WDIO.getText(elements.selector.visibleAfterFiveSecondsButton);
            return text;
             }
}
module.exports = new ElementsPage();
