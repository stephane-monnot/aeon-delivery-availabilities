/**
 * @name AEON
 *
 * @desc Logs into AEON. Provide your username and password as environment variables when running the script, i.e:
 * `SLACK_WEBHOOK_URL="httpsXXXX" AEON_USER=myuser AEON_PWD=mypassword node index.js`
 *
 */
const puppeteer = require('puppeteer')
const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);
const screenshot = 'aeon.png';
(async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto('https://gate.aeonsquare.net/auth/login.do?csid=newns_pc&next=https%3A%2F%2Fshop.aeon.com%2Fnetsuper%2Fcustomer%2Faccount%2Flogin%2F')
  await page.type('#loginForm_uname', process.env.AEON_USER)
  await page.type('#loginForm_pwd', process.env.AEON_PWD)
  await page.click('[name="login"]')
  await page.waitForSelector('.minicart-text');
  await page.click('.minicart-text')

  setTimeout(async () => {
    await page.click('#checkout-cart-delivery-shipping-time .delivery-button .button')
    await page.waitForSelector('.table-delivery-time');

    const deliveryText = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll('.table-delivery-time tr td:last-child'))
      return tds.map(td => td.innerText);
    });

    if (deliveryText.some(text => text !== '✕')) {
      // Available
      await webhook.send({
        text: 'Aeon delivery available',
      });
      console.log('available');
    } else {
      await webhook.send({
        text: 'Aeon test',
      });
      console.log('unavailable');
    }

    // await page.screenshot({ path: screenshot })
    browser.close()
  }, 5000)
})()
