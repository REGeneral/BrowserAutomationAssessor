import { normalizeRequest } from "./normalize.js"
import { detectBrowserProfile } from "./detectBrowser.js"
import { profileSignals } from "./profileSignals.js"

import { pathSignals } from "./pathSignals.js"
import { chromeHeaderOrderSignals } from "./headerSignals.js"
import { uaSignals } from "./uaSignals.js"
import { protocolSignals } from "./protocolSignals.js"
import { casingSignals } from "./casingSignals.js"
import { languageSignals } from "./languageSignals.js"
import { payloadSignals } from "./payloadSignals.js"

import { scoreSignals } from "./scoring.js"
import { explainRisk } from "./explainRisk.js"

export function analyzeRequest(rawReq) {

  const req = normalizeRequest(rawReq)

  const profile = detectBrowserProfile(req)

  const signals = [

    ...pathSignals(req),
    ...chromeHeaderOrderSignals(req),
    ...uaSignals(req),
    ...protocolSignals(req),
    ...casingSignals(req.rawHeaderNames),
    ...languageSignals(req),
    ...payloadSignals(req),
    ...profileSignals(req, profile)

  ]

  const risk = scoreSignals(signals)

  const explanation = explainRisk(risk, signals)

  return {

    risk,
    signals,
    explanation

  }

}