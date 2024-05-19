import requestPromise from "request-promise";
import * as cheerio from "cheerio";

(async () => {
  console.log(`Initial request to get the csrf_token value..`);
  let initialRequest = await requestPromise({
    uri: "http://quotes.toscrape.com/login",
    method: "GET",
    gzip: true,
    resolveWithFullResponse: true,
  });

  /* Parsing the cookies */
  let cookie = initialRequest.headers["set-cookie"]
    .map((value) => value.split(";")[0])
    .join(" ");

  let $ = cheerio.load(initialRequest.body);

  let csrfToken = $('input[name="csrf_token"]').val();

  console.log(`POST Request to login on the form`);
  try {
    let loginRequest = await requestPromise({
      uri: "http://quotes.toscrape.com/login",
      method: "POST",
      gzip: true,
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
      form: {
        csrf_token: csrfToken,
        username: "admin",
        password: "admin",
      },
      resolveWithFullResponse: true,
    });
    console.log(loginRequest);
    debugger;

  } catch (response) {
    /* Parsing the cookies */
    cookie = response.response.headers["set-cookie"]
      .map((value) => value.split(";")[0])
      .join(" ");
  }

  console.log(`LoggedIn Request`);
  let loggedInResponse = await requestPromise({
    uri: "http://quotes.toscrape.com/",
    method: "GET",
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
      Cookie: cookie,
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36",
    },
  });
  console.log(loggedInResponse);
  debugger;
})();
