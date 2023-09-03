# WebdriverIO

### To use this project

Step 1 - Unzip the folder

Step 2 - Check node.js is installed on your system  **`node -v`** If it isn't, please install the latest version. Validate you also have NPM installed **`npm -v`** 

Step 3 - Open terminal > Go to the project folder > Run command

**`npm install`**	// this will download and install all required libraries mentioned in package.json file. However if some depenendices don't appear, please validate in the package.json file. Two dependencies you want to make sure you have are: 1. Lodash (https://github.com/lodash/lodash)  2. Chai (https://github.com/marcodejongh/chai-webdriverio)

**`npx wdio`**		// this will run the tests

### Project Setup & WebdriverIO Installation

Step 1 - Create a new folder and open in IDE (VS Code)

Step 2 - Open terminal in VS Code and run command 	**`npm init -y`**  You can also run **`npm init wdio`** to create your wdio.config.js file, however you will need to copy the one I have so you can run in Headless mode. **PLEASE MAKE SURE TO RUN YOUR TESTS IN HEADLESS MODE**. 

Step 3 - Select the options as required and install

Step 4 - Check WebdriverIO version 					**`npm ls webdriverio`**

Step 5 - Check wdio.conf.js file and project folders are created if you chose to run **`npm init wdio`**, otherwise you should have just used my wdio.conf.js file. 

Step 6 - To run existing tests

Run all tests in the folder configured in wdio.conf.js 	**`npx wdio run wdio.conf.js`**

or

**`npm run wdio`**

Run specific tests	 **`npx wdio run wdio.conf.js --spec buttonFunctionality.spec.js`**

