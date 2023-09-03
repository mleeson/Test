

const WDIO = require('./WDIO');
const home = require('../selectors/homePage.selectors');

class HomePage extends WDIO {
  /**
   * Goes to the demoqa.com Home Page
   * @param {string} url
   */
 async goToHomepage(url) {
    await WDIO.goToUrl(url);
}

    /**
     * Clicks the Elements button
     */
    async clickElementsButton() {
        await WDIO.waitUntilDisplayed(home.selector.homeBanner);
        await WDIO.waitAndClick(home.selector.elementsButton);
    }

    /**
     * Clicks the Forms button
     */
        async clickFormsButton() {
            await WDIO.waitUntilDisplayed(home.selector.homeBanner);
            await WDIO.waitAndClick(home.selector.formsButton);
        }
}

module.exports = new HomePage();
