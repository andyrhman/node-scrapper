// ? https://chatgpt.com/c/cf8d8457-46fb-466d-b08a-7472b3633a14
const axios = require("axios");
const cheerio = require("cheerio");

(async () => {
  try {
    // Fetch the webpage
    // Fetch the webpage with headers
    const response = await axios.get("https://m.imdb.com/title/tt0903747/", {
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en-GB;q=0.9,en;q=0.8",
        "Cache-Control": "max-age=0",
        Cookie:
          "session-id=135-1724920-6163333; session-id-time=2082787201l; ubid-main=130-0183836-9514570; uu=eyJpZCI6InV1YjI4MDBlMGJhMzUxNDMwZDk0MmEiLCJwcmVmZXJlbmNlcyI6eyJmaW5kX2luY2x1ZGVfYWR1bHQiOmZhbHNlfX0=; ad-oo=0; session-token=+alexorBkGIcFUbrB41qxC4tlL3HFKrFUwwAosngOI5WDSSfgNSEcNLyS91/wQnxY79azXXnubrcFDOUHuMpEYCrELonkNds5fQlC8ecKy6x8CCJEAzvsGbHIEtHtLX2XQigGLSe1uKbku8ijJThdmg4a27ju+CR8+qMp8fnmh8f5PP0PkV002hR7gIZ5QHMgDTxSOJcqE6YmIobTOFprXfvzT6Y0vbmIdEJD2Y7nVso8jX1FADmU8PMeQKdCFRCesGPUGhLMitk/jpeuwWYTe/Bfq65pExL20bJCLBdEJoS25GLlLS7IhtYD/tUlCx2erriVEk97tXmo4fRYb/DVWYhtLJVxNg2; csm-hit=tb:CWXPHXR60MRXX4D6G1YZ+s-CWXPHXR60MRXX4D6G1YZ|1715428961899&t:1715428961899&adb:adblk_no; ci=e30",
        Priority: "u=0, i",
        Referer: "https://www.google.com/",
        "Sec-Ch-Ua":
          '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "Windows",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
    });
    const html = response.data;

    // Load HTML into cheerio
    const $ = cheerio.load(html);

    // Extract the title
    const title = $(
      'h1[class="sc-d8941411-0 dxeMrU"] > span[class="hero__primary-text"]'
    ).text();

    const poster = $(".ipc-image").attr("src");

    const date = $(
      "ul.ipc-inline-list.ipc-inline-list--show-dividers.sc-d8941411-2.cdJsTz.baseAlt > li.ipc-inline-list__item"
    )
      .eq(1)
      .text()
      .trim();

    const releaseDate = $(
      'a[href="/title/tt0903747/releaseinfo?ref_=tt_dt_rdat"]'
    )
      .eq(1)
      .text()
      .trim();

    const rating = $(".sc-bde20123-2.cdQqzc > span").eq(0).text();

    const data = { title, date, rating, releaseDate, poster };

    // Output JSON format
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error fetching the page:", error.message);
  }
})();
