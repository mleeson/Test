const _ = require('lodash');

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/

/**
 * Common options accepted by WDIO commands
 * @typedef {Object} WebDriverOptions
 * @property {number} timeout number of milliseconds to wait for condition. Defaults to 8000
 * @property {number} interval interval in milliseconds to check for condition. Defaults to 50
 * @property {string} timeoutMsg message to be thrown when condition is not satisfied within timeout
 * @property {boolean} reverse if true it waits for the opposite (default: false)
 */

async function getBoundingClientRect(selector) {
  const item = await $(selector);
  return browser.execute(function (el) {
    return el.getBoundingClientRect();
  }, item);
}

/**
 * Wait for an element to be clickable
 *
 * @param {string} element the element selector
 * @param {WebDriverOptions} options additional wait options for wdio
 */
async function checkIsClickable(element, options = {}) {
    if (!(await element.isClickable())) { await element.waitForClickable(options); }
  }

module.exports = class WDIO {
  
  /**
   * Wait for an element to be clickable and then click on it
   *
   * @param {string} selector the element selector
   * @param {WebDriverOptions} options additional wait options for wdio
   */
  static async waitAndClick(selector, options = {}) {
    const item = await $(selector);
    await checkIsClickable(item, options);
    await item.click();
  }

  /**
   * Wait for the given selector to be displayed
   * @param {string} selector
   * @param {WebDriverOptions} [options]
   */
  static async waitUntilDisplayed(selector, options) {
    const item = await $(selector);
    await item.waitForDisplayed(options);
  }

  /**
   * Goes to a URL 
   * @param {string} url
   */
  static async goToUrl(url) {
    let localUrl = url;

    if (_.isString(url)) {
      if (!url.startsWith('http')) {
        localUrl = `https://${url}`;
      }

      localUrl = new URL(localUrl);
    }

    await browser.url(localUrl.toString());
  }

  /**
   * Click on a element containing a specific text
   *
   * @param {string} selector the element selector
   * @param {string} text the text content
   * @param {WebDriverOptions} options additional wait options for wdio
   */
    static async clickByText(selector, text, options = {}) {
      const item = await $(selector).$(text);
      await checkIsClickable(item, options);
      await item.click();
    }

  /**
   * Waits for an element containing text to not be empty
   * @param {string} selector the element selector
   */
    static async waitUntilTextNotEmpty(selector) {
      await browser.waitUntil(async function () {
        const items = await $$(selector);
  
        if (_.isEmpty(items)) {
          return false;
        }
  
        const text = await items[0].getText();
        return !_.isEmpty(text);
      }, { timeoutMsg: `Text for selector '${selector}' still empty after timeout` });
    }

  /**
   * Gets the text for an element found by a given selector
   * @param {string} selector 
   */
    static async getText(selector) {
      await this.waitUntilTextNotEmpty(selector);
      const text = (await $(selector)).getText();
      return text;
    }

  /**
   * Wait for the selector to have the given index 
   * This method will retrieve all elements returned by selector and check if the required index is present
   * @param {string} selector selector which is supposed to return 1 or more elements
   * @param {number} index index position to wait for. The index count starts from position 0
   * @param {WebDriverOptions} options
   */
  static async waitUntilArrayHasIndex(selector, index, options = {}) {
    let currentLength;

    await browser.waitUntil(
      async function () {
        const items = await $$(selector);
        currentLength = items.length;
        return currentLength > index;
      },
      {
        timeoutMsg: `Error to wait for array to have index ${index}. `
          + `It has currently a length of ${currentLength}.`,
        ...options,
      },
    );
  }

  /**
   * Clicks the index for an element found by given selector
   * @param {string} selector element string selector
   * @param {string} index value to be added in the target element
   */
  static async clickByIndex(selector, index) {
    await this.waitUntilArrayHasIndex(selector, index);
    const item = await $$(selector)[index];
    await checkIsClickable(item);
    await item.click();
  }

   /**
   * Add a value to an element found by given selector. Notice that this method does clear the
   * input before adding the new value and it will send each char using a keystroke
   * @param {string} selector element string selector
   * @param {string} value value to be added in the target element
   */
   static async setValue(selector, value) {
    const item = await $(selector);
    await checkIsClickable(item);
    await item.setValue(value);
  }

  /**
   * Wait for a `<select>` element to contain a specific option `text`
   * @param {string} selector selector for `<select>` element
   * @param {string} text string option that should be available inside the `<select>` element
   */
  static async waitForSelectHasOptionWithText(selector, text) {
    await browser.waitUntil(async function () {
      const items = await $$(selector);
      if (_.isEmpty(items)) { return false; }
      const selectorText = await items[0].getText();
      return !_.isEmpty(selectorText.match(new RegExp(`^\\s*${_.escapeRegExp(text)}\\s*$`, 'm')));
    }, { timeoutMsg: `Option '${text}' not found for select '${selector}'` });
  }

  /**
   * Select option with displayed text matching the `text` param
   * @param {string} selector selector pointing to `<select>` element
   * @param {string} text text of option element to get selected
   */
    static async selectByVisibleText(selector, text) {
      const item = await $(selector);
      await checkIsClickable(item);
      await this.waitForSelectHasOptionWithText(selector, text);
      await item.selectByVisibleText(text);
    }

  /**
   * Wait for element stop scrolling. This method uses the element getBoundingClientRect and checks
   * if the y coordinate changes from one iteration to another. If y coordinate does not change in 3
   * consecutive checks, we can consider that the element stopped moving vertically (scroll)
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
   * @param {string} selector element selector 
   * Uses 'body' by default, which is able to detect whole page scrolling.
   */
  static async waitUntilStopScroll(selector = 'body') {
    let previousY;
    let currentY = (await getBoundingClientRect(selector)).y;
    let counter = 0;

    await browser.waitUntil(async function () {
      previousY = currentY;
      currentY = (await getBoundingClientRect(selector)).y;
      counter = (previousY === currentY) ? counter + 1 : 0;

      return counter >= 2;
    }, { interval: 300, timeoutMsg: `Timeout while waiting for selector '${selector}' stop scroll` });
  }
  
  /**
   * @param {string} selector 
   * Scrolls the selector into view on the page
   */
  static async scrollIntoView(selector) {
    const item = await $(selector);
    await item.scrollIntoView();
    await this.waitUntilStopScroll();
  }

  /**
   * Assert that `asyncFunc` will throw an Error and returns it
   * @param {() => Promise} asyncFunc a function which returns a Promise and is supposed to throw an error
   * @returns returns the caught error object, so the caller can execute additional assertions
   * @throws it will throw an Assertion Error if the given function does not throw any error
   */
  static async expectToThrowAsync(asyncFunc) {
    try {
      await asyncFunc();
    } catch (error) {
      return error;
    }

    return expect.fail(`Expected ${asyncFunc} to throw`);
  }
};
