import { chromeProfile } from "./profiles/chrome.js"
import { firefoxProfile } from "./profiles/firefox.js"

export function detectBrowserProfile(req) {

  const ua = req.ua.toLowerCase()

  if (ua.includes("chrome") && !ua.includes("edg")) {
    return chromeProfile
  }

  if (ua.includes("firefox")) {
    return firefoxProfile
  }

  return null
}