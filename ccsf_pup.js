const puppeteer = require("puppeteer");

async function main() {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto("https://www.primarybio.com/r/ccsf-public");
    await page.waitForSelector(
      ".main-container .row .col-md:nth-child(2) > div"
    );
    console.log("here");
    function scrape() {
      return Array.from(
        document.querySelectorAll(
          ".main-container .row .col-md:nth-child(2) > div"
        )
      ).map((item) => ({
        type: item.querySelector("h4").innerText,
        slots: item.querySelectorAll("dd")[1].innerText,
      }));
    }

    console.log(await page.evaluate(scrape));
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
