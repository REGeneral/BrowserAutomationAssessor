export const firefoxProfile = {

  name: "firefox",

  requiredHeaderClusters: [
    ["sec-fetch-site", "sec-fetch-mode", "sec-fetch-dest"]
  ],

  expectedEncodings: ["gzip", "deflate", "br"],

  typicalAcceptLanguagePattern:
    /^[a-z]{2}-[A-Z]{2}(,[a-z]{2};q=0\.[0-9])?$/,

  typicalHeaders: [
    "user-agent",
    "accept",
    "accept-language",
    "accept-encoding"
  ]

}