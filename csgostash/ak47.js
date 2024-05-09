const axios = require("axios");
const cheerio = require("cheerio");

(async () => {
  try {
    // Fetch the webpage
    const response = await axios.get("https://csgostash.com/weapon/AK-47");
    const html = response.data;

    // Load HTML into cheerio
    const $ = cheerio.load(html);

    const scrape = $(
      'div[class="row"] > div[class="col-lg-4 col-md-6 col-widen text-center"]'
    )
      .map((index, element) => {
        const brand =
          $(element)
            .find('div[class="well result-box nomargin"] > h3 > a')
            .text()
            .trim() || null;

        // If there is multiple a line in the same indentation
        const findLink = $(element).find(".well.result-box.nomargin > a");
        const link =
          $(element).find(findLink.get(1)).attr("href") || null;

        const image =
          $(element)
            .find(
              ".well.result-box.nomargin > a > .img-responsive.center-block.margin-top-sm.margin-bot-sm"
            )
            .attr("src") || null;

        const price = $(element)
          .find(".well.result-box.nomargin > .price > .nomargin > a")
          .map((i, el) => $(el).text().trim())
          .get();
        /* 
            ? Price response
            "price": [
                "Rp 1.366.345 - Rp 4.657.949",
                "Rp 2.485.944 - Rp 11.102.756"
            ]
        */
        return { brand, link, image, price };
      })
      .get()
      .filter((item) => item.brand && item.image && item.link && item.price); // Remove any null or empty values

    // Organize data into an object
    const data = {
      scrape,
    };

    // Output JSON format
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error fetching the page:", error.message);
  }
})();
