const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

setDefaultTimeout(60 * 1000);

let sharedBrowser;

BeforeAll(async function () {
  const headless = process.env.HEADLESS !== "false";
  sharedBrowser = await chromium.launch({ headless });
});

/*
BeforeAll(async function () {
  sharedBrowser = await chromium.launch({
    headless: false,          // Open browser
    slowMo: 1000,             // 1 second delay after every action
    args: ["--start-maximized"]
  });
});
*/



AfterAll(async function () {
  if (sharedBrowser) {
    await sharedBrowser.close();
  }
});

Before(async function () {
  this.browser = sharedBrowser;
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});


/*
Before(async function () {
  this.browser = sharedBrowser;

  this.context = await this.browser.newContext({
    viewport: null
  });

  this.page = await this.context.newPage();
});

*/

After(async function (scenario) {
  if (scenario.result && scenario.result.status === Status.FAILED && this.page) {
    const screenshotsDir = path.join(process.cwd(), "reports", "screenshots");
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    const safeName = scenario.pickle.name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    const screenshotPath = path.join(screenshotsDir, `${safeName}-${Date.now()}.png`);
    const image = await this.page.screenshot({ path: screenshotPath });
    this.attach(image, "image/png");
  }
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
});
