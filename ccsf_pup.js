const { exec } = require("child_process");
const puppeteer = require("puppeteer");

function sanitize(msg) {
  return msg.replace(/[^\w \.]/g, "");
}

async function notify(msg) {
  return new Promise((resolve, reject) => {
    exec(
      `osascript -e 'display notification "${sanitize(msg)}"'`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(stdout, stderr);
      }
    );
  });
}

async function main() {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto("https://www.primarybio.com/r/ccsf-public");
    await page.waitForSelector(
      ".main-container .row .col-md:nth-child(2) > div"
    );
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

    let res = await page.evaluate(scrape);

    let available = res.filter(
      (item) => item.slots !== "No appointments available"
    );

    if (available.length > 0) {
      await notify(
        `Vaccination slot available. Type: ${available[0].type} Slot: ${available[0].slots}`
      );
      console.log("Appointment slots found!");
    } else {
      console.log("No appointment slots");
    }

    console.log("");
    console.log(res);
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
