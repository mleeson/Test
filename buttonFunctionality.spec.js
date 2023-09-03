const HomePage = require ('../pageobjects/home.page')
const ElementsPage = require ('../pageobjects/elements.page')
var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));

const url = 'https://demoqa.com/';

describe('Button Functionality', function () {

    it('should validate that the: You have done a dynamic click text appears', async () => {
        await HomePage.goToHomepage(url);
        await HomePage.clickElementsButton();
        await ElementsPage.clickButtonsLink();
        await ElementsPage.clickMeButton();
        const successText = await ElementsPage.getSuccessText();
        chai.expect(successText).to.equal('You have done a dynamic click');
    })
})