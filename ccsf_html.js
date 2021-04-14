const cheerio = require("cheerio");
const fetch = require("node-fetch");

function get() {
  return fetch("https://www.primarybio.com/r/ccsf-public", {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,tr;q=0.8",
      "cache-control": "max-age=0",
      "if-none-match": 'W/"056b2b19b7645ccdd8d8e5399f7c0c2d"',
      "sec-ch-ua":
        '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie:
        "__stripe_mid=f4b72385-ef34-4195-8779-9060292288a7345151; _ga=GA1.2.2038548380.1617819542; _gid=GA1.2.1911716520.1618202583; QueueITAccepted-SDFrts345E-V3_ccsfpublic=EventId%3Dccsfpublic%26QueueId%3D46cf127e-6bd5-4980-bdbb-2f4a40fad647%26RedirectType%3Dsafetynet%26IssueTime%3D1618357344%26Hash%3D356018bdd67070722ffe2d55fc14d517e9ec5d4bd237cf5cfcce72faa9a63750; _biostatus_session=U%2BBneNTq6VHB9ZzilPFAazw5dP6VXTP6282d1Lfm9IiO7NAkYUwdZjMvEccxnHF8ggQTMln44O6zpQo6xMdZe%2FZvIZDI7FnjQqwAc44qEUkivIHX5fTGarTUVtHJPip6gH0YThv6h85UjiDm%2FlyZok1a%2FMVzYuQaVuVdTgVvJEtS5FbsTjQ0Gn0lOmA1WG6hBn64vA3Ysn6SL2XavLiR1X%2FGCBvlz2%2B2Lw5TGoDCZ4bsyVju15eH3H%2FtuFmD%2BQak70cF%2BcY1f7uzKI9Owl8I0bBc2SUvh2%2BiBvEcwfy%2F0ONcFaDmhEOoaIyRV%2Fn2LKh63FQTM969PcEJnA%3D%3D--5S7c7j7FbKdFuTyB--lFx2D9gavi0P8iDcKdTvrA%3D%3D; _gat_UA-168761374-1=1",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
  }).then((resp) => resp.text());
}

async function main() {
  let html = await get();
  let dom = cheerio.load(html);
  console.log(dom);
}

main().catch(console.error);
