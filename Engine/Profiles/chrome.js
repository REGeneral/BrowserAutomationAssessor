export const chromeProfile = {

  name: "chrome",

  requiredHeaderClusters: [
    ["sec-fetch-site", "sec-fetch-mode", "sec-fetch-dest"],
    ["sec-ch-ua", "sec-ch-ua-mobile", "sec-ch-ua-platform"]
  ],

  expectedEncodings: ["gzip", "deflate", "br", "zstd"],

  typicalAcceptLanguagePattern:
    /^[a-z]{2}-[A-Z]{2}(,[a-z]{2}-[A-Z]{2};q=0\.[0-9])?(,[a-z]{2};q=0\.[0-9])?$/,

  typicalHeaders: [
    "user-agent",
    "accept",
    "accept-encoding",
    "accept-language",
    "sec-fetch-site",
    "sec-fetch-mode",
    "sec-fetch-dest"
  ]

}