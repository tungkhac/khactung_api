const {By, Builder} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const assert = require("assert");
const Chrome = require('selenium-webdriver/chrome');
const options = new Chrome.Options();
options.addArguments('--no-sandbox');
options.addArguments('--allow-running-insecure-content');
options.detachDriver(true); //set not close
options.excludeSwitches('enable-automation');//not block popup 

options.addArguments("--user-data-dir=='C:\\Users\\nguyen.khac.tung\\AppData\\Local\\Google\\Chrome\\User Data'");
options.addArguments('--profile-directory=Profile 1');

describe('surf', async function () {
    let driver;
    before(async function () {
        // driver = webdriver.Chrome(executable_path=r'C:\Program Files (x86)\chromedriver.exe', options=options)
        driver = await new Builder()
            .forBrowser(webdriver.Browser.CHROME)
            .setChromeOptions(options)
            .build();
    });
    
    it('Surf', async function () {
        await driver.get('https://twitter.com');

        // let title = await driver.getTitle();

        await driver.manage().setTimeouts({implicit: 500});

        // let textBox = await driver.findElement(By.name('my-text'));
        // let submitButton = await driver.findElement(By.css('button'));
        //
        // await textBox.sendKeys('Selenium');
        // await submitButton.click();
        //
        //
        // let message = await driver.findElement(By.id('message'));
        // let value = await message.getText();
    });

    // after(async () => await driver.quit());
});