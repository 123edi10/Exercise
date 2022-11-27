const Main = require("../main");
const assert = require("assert");
const url = "https://www.google.co.il/search?q=google+calculator";

describe("Excersie tests", () => {
  var items = {};
  before(async () => {
    try {
      await Main.connectUrl(url);
      items = await Main.mapItemsByXpath(
        "//table[not(@dir='ltr')]/tbody/tr/td"
      );
    } catch {
      assert.fail(new TypeError(`Cant connect to ${url}`));
    }
  });
  it("The result of 5 + 10 its 15", async () => {
    const result = await Main.clickOnString(items, "5+10=");
    assert.equal(result, 15);
  });
  it("The amount of numbered buttons its 10", async () => {
    const buttonAmount = await Main.checkNumberButtons(items);
    assert.equal(buttonAmount, 10);
  });
  it("The amount of buttons its 34", async () => {
    const buttonAmount = Object.keys(items).length;
    assert.equal(buttonAmount, 34);
  });
  after(async () => {
    Main.closeBrowser();
  });
});
