const puppeteer = require("puppeteer");
const { convert } = require("html-to-text");

const args = process.argv.slice(2);
const query = args.join(" ");

const options = {
  wordwrap: 130,
};

(async () => {
  const browser = await puppeteer.connect({
    browserURL: "http://127.0.0.1:9999/json",
    defaultViewport: null,
    timeout: 0,
    protocolTimeout: 120000
  });

  const pages = await browser.pages();

  const chatGPTUrl = "https://app.slack.com/client/T0VLFSHLJ/D053KN3TQ2G";

  let page = pages.filter((p) => p.url().startsWith(chatGPTUrl))[0];

  if (page) {
    if (query != "" && query.length > 1) {
      let messages = [];
      if (query.indexOf("POOR_GPT_SEP") > -1) {
        messages = query.split("POOR_GPT_SEP");
      } else {
        messages[0] = query;
      }

      for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        await page.type('div.ql-editor', message);
        await page.keyboard.down("Shift");
        await page.keyboard.press("Enter");
        await page.keyboard.up("Shift");
      }

      await page.keyboard.press("Enter");

    } else {
      html = await page.evaluate(() => {
        const element = Array.from(document.querySelectorAll("div.p-rich_text_block")).findLast(
          (el) => el.textContent.includes("(edited)")
        );
        return element.innerText;
      });

      console.log(html);

    }

  } else {
    console.log("Claude tab not found.");
  }

  browser.disconnect();
})();




