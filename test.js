import { analyzeRequest } from "./Engine/index.js";

const tests = [

  {
    name: "Legitimate Chrome request",

    req: {
      path: "/api/me",

      headers: {
        "Host": "www.test.com",
        "Connection": "keep-alive",
        "sec-ch-ua-platform": '"Windows"',
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
        "sec-ch-ua":
          '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
        "sec-ch-ua-mobile": "?0",
        "Accept": "*/*",
        "Origin": "https://open.test.com",
        "Sec-Fetch-Site": "same-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Referer": "https://open.test.com/",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8"
      },

      body: ""
    }
  },

  {
    name: "Suspicious bot request",

    req: {
      path: "/api/login",

      headers: {
        "user-agent": "Mozilla/5.0",
        "Accept": "*/*",
        "Accept-Encoding": "gzip",
        "Accept-Language": "en"
      },

      body: ""
    }
  },

  {
    name: "Clearly malicious request",

    req: {
      path: "/%2e%2e/%2e%2e/admin",

      headers: {
        "USER-AGENT": "Chrome/123",
        "sec-ch-ua": '"Chromium";v="110"',
        "Content-Length": "10",
        "ACCEPT-LANGUAGE": "en;q=0.1,zz;q=0.2"
      },

      body: "%25%25%25%25%25%25%25%25"
    }
  }

];


for (const test of tests) {

  console.log("\n==============================");
  console.log(test.name);
  console.log("==============================");

  const result = analyzeRequest(test.req);

  console.log(JSON.stringify(result, null, 2));

}