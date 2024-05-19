import axios from "axios";
import * as cheerio from "cheerio";
/* 
  ! NOT WORK (FOR NOW)
  ! USE REQUEST-PROMISE INSTEAD
*/
(async () => {
  console.log(`Initial request to get the csrf_token value..`);
  const initialResponse = await axios({
    url: "https://quotes.toscrape.com/login",
    method: "get",
    gzip: true,
  });

  /* Parsing the cookies */
  let cookie = initialResponse.headers["set-cookie"]
    .map((value) => value.split(";")[0])
    .join(" ");

  const $ = cheerio.load(initialResponse.data);

  let csrfToken = $('input[name="csrf_token"]').val();

  console.log(cookie);

  // * Login request
  // ! Login first to a website to fecth the header
  let loginRequest = await axios.post(
    "http://quotes.toscrape.com/login",
    `csrf_token=${csrfToken}&username=admin&password=admin`,
    {
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "Cache-Control": "max-age=0",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Host: "quotes.toscrape.com",
        Origin: "http://quotes.toscrape.com",
        Referer: "http://quotes.toscrape.com/login",
        "Upgrade-Insecure-Requests": "1",
        Cookie: cookie,
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36",
      },
    }
  );

  console.log(loginRequest);

  /* Parsing the cookies */
  let loginCookie = loginRequest.headers["set-cookie"]
    .map((value) => value.split(";")[0])
    .join(" ");

  console.log(loginCookie);

  let loggedInResponse = await axios({
    url: "http://quotes.toscrape.com/",
    method: "get",
    gzip: true,
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
      "Cache-Control": "max-age=0",
      Connection: "keep-alive",
      Host: "quotes.toscrape.com",
      Origin: "http://quotes.toscrape.com",
      Referer: "http://quotes.toscrape.com/login",
      "Upgrade-Insecure-Requests": "1",
      Cookie: loginCookie,
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36",
    },
  });
    console.log(loggedInResponse);
  debugger;
})();
