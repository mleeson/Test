const HomePage = require ('../pageobjects/home.page')
const ElementsPage = require ('../pageobjects/elements.page')
var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));

const url = 'https://demoqa.com/';

describe('Button Visibility', function () {

    it('should validate the Visible After 5 Seconds button is displayed', async () => {
        await HomePage.goToHomepage(url);
        await HomePage.clickElementsButton();
        await ElementsPage.clickDynamicPropertiesLink();
        const buttonVisbilityText = await ElementsPage.getButtonAFterFiveSecondsText();
        chai.expect(buttonVisbilityText).to.equal('Visible After 5 Seconds');
    })
})