
import chrome  from'chrome-aws-lambda'
import  puppeteer  from'puppeteer-core'

export default async (request, response) => {

  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  });

  const page = await browser.newPage();
  await page.goto('https://google.com');

  let bodyHTML = await page.evaluate(() => document.body.innerHTML);
  await browser.close();

  response.send({
    html: bodyHTML
  });
}
