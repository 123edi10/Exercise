const { until, By, Builder } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");

const options = new Options()
  .addArguments("--no-sandbox")
  .addArguments("--headless");

const driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .build();

class Main {
  constructor() {
    global.driver = driver;
  }
  static async connectUrl(url) {
    await driver.get(url);
  }
  static async mapItemsByXpath(path) {
    const items = {};
    const allButtonsElements = await driver.findElements(By.xpath(path));
    for (let item of allButtonsElements) {
      items[await item.getText()] = item;
    }
    return items;
  }
  static async checkNumberButtons(items) {
    let numOfDigitButtons = 0;
    Object.keys(items).forEach((item) => {
      if (/^\d+$/.test(item)) numOfDigitButtons++;
    });
    return numOfDigitButtons;
  }
  static async clickOnString(items, exercise) {
    const exerciseMembers = exercise.split(/(?!$)/u);
    const itemsArray = Object.keys(items);
    for (let member of exerciseMembers) {
      const item = itemsArray.find((element) => element === member.toString());
      await items[item].click();
    }
    return await driver
      .wait(
        until.elementTextMatches(
          driver.findElement(By.xpath('//span[@id="cwos"]')),
          /[1-9]+[0-9]{0,}/u
        )
      )
      .getText();
  }
  static async closeBrowser() {
    await driver.quit();
  }
}

module.exports = Main;
