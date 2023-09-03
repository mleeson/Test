const WDIO = require('./WDIO');
const forms = require('../selectors/formsPage.selectors');

/**
 * Common options accepted by WDIO commands
 * @typedef {Object} WebDriverOptions
 * @property {number} timeout number of milliseconds to wait for condition. Defaults to 8000
 * @property {number} interval interval in milliseconds to check for condition. Defaults to 50
 * @property {string} timeoutMsg message to be thrown when condition is not satisfied within timeout
 * @property {boolean} reverse if true it waits for the opposite (default: false)
 */

class FormsPage extends WDIO {

    /**
     * Clicks the Practice Form link
     */
 async clickPracticeFormLink() {
    await WDIO.waitUntilDisplayed(forms.selector.practiceFormLink, { timeout: 20000 });
    await WDIO.waitAndClick(forms.selector.practiceFormLink);
}

  /**
   * Sets a value in the First Name field
   * @param {string} firstName
   */
 async setFirstName(firstName) {
    await WDIO.waitUntilDisplayed(forms.selector.firstName, { timeout: 20000 });
    await WDIO.setValue(forms.selector.firstName, firstName);
}

  /**
   * Sets a value in the Last Name field
   * @param {string} lastName
   */
 async setLastName(lastName) {
    await WDIO.setValue(forms.selector.lastName, lastName);
}

   /**
   * Sets a value in the Email field
   * @param {string} emailAddress
   */
 async setEmailAddress(emailAddress) {
    await WDIO.setValue(forms.selector.userEmail, emailAddress);
}

   /**
   * Select a gender from the Gender section
   * @param {string} gender
   * @param {WebDriverOptions}
   */
  async selectGender(gender) {
    WDIO.waitUntilDisplayed(forms.selector.gender, { timeout: 20000 });
    switch (gender.toLowerCase()) {
      case 'male':
        await WDIO.clickByIndex(forms.selector.gender, 0);
        break;
      case 'female':
        await WDIO.clickByIndex(forms.selector.gender, 1);
        break;
        case 'other':
        await WDIO.clickByIndex(forms.selector.gender, 2);
        break;
    }
  }

   /**
   * Sets a value in the Mobile field
   * @param {string} mobile
   */
  async setMobile(mobile) {
    await WDIO.setValue(forms.selector.mobile, mobile);
}

  /**
   * Clicks on the Calendar, then selects a month, year and day
   * @param {string} month
   * @param {string} year
   * @param {string} daySelection
   */
 async setDate(month, year, daySelection) {
   await WDIO.waitAndClick(forms.selector.date);
   await WDIO.selectByVisibleText(forms.selector.monthSelection, month);
   await WDIO.selectByVisibleText(forms.selector.yearSelection, year);
   await WDIO.waitAndClick(forms.selector.daySelection(daySelection));
}

   /**
   * Wait for the given selector to be displayed
   * @param {string} selector
   */
    async setSubjectValue(subject) {
      await WDIO.setValue(forms.selector.subjectField, subject);
    }

   /**
   * Clicks the Hobby checkboxes
   * @param {string} selector
   */
    async clickHobby(index) {
      await WDIO.clickByIndex(forms.selector.hobbies, index);
      }
  

   /**
   * Sets a value in the Address field
   * @param {string} address
   */
    async setCurrentAddress(address) {
      await WDIO.setValue(forms.selector.currentAddressField, address);
    }
  

   /**
   * Selects the NCR value from the State dropdown
   */
  async selectNCRState() {
    await WDIO.scrollIntoView(forms.selector.state)
    await WDIO.waitAndClick(forms.selector.state);
    await browser.keys('Enter');
    }

   /**
   * Selects the Delhi value from the City dropdown
   */
  async selectDelhiCity() {
    await WDIO.waitAndClick(forms.selector.city);
    await browser.keys('Enter');
    }

   /**
   * Clicks the Submit button
   */
 async clickSubmitButton() {
  await WDIO.waitAndClick(forms.selector.submitButton);
  }

   /**
     * Gets the Thanks text from the modal
     * @param {WebDriverOptions}
     */
   async getThanksText() {
    await WDIO.waitUntilDisplayed(forms.selector.thanksText, { timeout: 20000 });
    const text = await WDIO.getText(forms.selector.thanksText);
    return text;
}

   /**
   * Clicks the Close button
   */
   async clickCloseButton() {
    await WDIO.scrollIntoView(forms.selector.closeButton);
    await WDIO.waitAndClick(forms.selector.closeButton);
    }
  

}

module.exports = new FormsPage();
