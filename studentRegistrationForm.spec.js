const HomePage = require ('../pageobjects/home.page')
const FormsPage = require ('../pageobjects/forms.page')
const WDIO = require ('../pageobjects/WDIO');
const forms = require('../selectors/formsPage.selectors');
var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));

const url = 'https://demoqa.com/';
const firstName = 'Matt';
const lastName = 'Leeson';
const email = 'matthewleeson@yahoo.com';
const gender = 'male';
const mobile = '0123456789';
const month = 'January';
const year = '1991';
const day = 'Choose Sunday, January 6th, 1991';
const subject = 'QA Automation';
const address = '1573 Sinclair Ave. Chattanooga, TN 37408';
let thanksText;

describe('Student Registration Form', function () {

    it('should validate that the student registration form is submitted successfully', async () => {
        await HomePage.goToHomepage(url);
        await HomePage.clickFormsButton();
        await FormsPage.clickPracticeFormLink();
        await FormsPage.setFirstName(firstName);
        await FormsPage.setLastName(lastName);
        await FormsPage.setEmailAddress(email);
        await FormsPage.selectGender(gender);
        await FormsPage.setMobile(mobile);
        await FormsPage.setDate(month, year, day);
        await FormsPage.setSubjectValue(subject);
        await FormsPage.clickHobby(0);
        await FormsPage.clickHobby(1);
        await FormsPage.setCurrentAddress(address);
        await FormsPage.selectNCRState();
        await FormsPage.selectDelhiCity();
        await FormsPage.clickSubmitButton();
        thanksText = await FormsPage.getThanksText();
        chai.expect(thanksText).to.equal('Thanks for submitting the form');
        await FormsPage.clickCloseButton();
        await browser.refresh();
        const error = await WDIO.expectToThrowAsync(() => FormsPage.clickCloseButton()
        );
        chai.expect(error).to.exist
    })
})