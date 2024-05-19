// ? https://chatgpt.com/c/cf8d8457-46fb-466d-b08a-7472b3633a14
import axios from "axios";
import * as cheerio from 'cheerio';

(async () => {
  try {
    // Fetch the webpage
    const response = await axios.get(
      "https://csgostash.com/skin/1515/AK-47-Nightwish"
    );
    const html = response.data;

    // Load HTML into cheerio
    const $ = cheerio.load(html);

    // Extract the title
    const title = $('div[class="well result-box nomargin"] > h2').text().trim();

    // Extract all prices from #prices div
    const prices = $("#prices .btn-group-sm a")
      .map((index, element) => {
        const brand =
          $(element).find("span.pull-left.price-details-st").text().trim() ||
          null;

        const condition = $(element)
          .find('span[class="pull-left"]')
          .text()
          .trim();
          
        const price = $(element).find("span.pull-right").text().trim();

        return { brand, condition, price };
      })
      .get()
      .filter((item) => item.condition && item.price); // Remove any null or empty values

    // Organize data into an object
    const data = {
      title,
      prices,
    };

    // Output JSON format
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error fetching the page:", error.message);
  }
})();
