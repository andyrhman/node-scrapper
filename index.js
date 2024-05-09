// ? https://chatgpt.com/c/cf8d8457-46fb-466d-b08a-7472b3633a14
const axios = require("axios");
const cheerio = require("cheerio");

// Function to insert spaces before capital letters
function addSpaces(text) {
    return text.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
}

(async () => {
    try {
        // Fetch the webpage
        const response = await axios.get("https://csgostash.com/skin/1515/AK-47-Nightwish");
        const html = response.data;

        // Load HTML into cheerio
        const $ = cheerio.load(html);

        // Extract the title
        const rawTitle = $(".well.result-box.nomargin h2 a").text();
        const title = rawTitle.replace("AK-47Nightwish", "AK-47 Nightwish");

        // Extract all prices from #prices div
        const prices = $("#prices .btn-group-sm a")
            .map((index, element) => {
                const condition = addSpaces($(element).find("span.pull-left").text().trim());
                const price = $(element).find("span.pull-right").text().trim();
                if (condition && price) {
                    return { condition, price };
                }
                return null;
            })
            .get()
            .filter(Boolean); // Remove any null or empty values

        // Organize data into an object
        const data = {
            title,
            prices
        };

        // Output JSON format
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error fetching the page:", error.message);
    }
})();
