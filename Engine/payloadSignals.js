export function payloadSignals(req) {
  const signals = []

  const body = req.body

  if (!body) return signals

  const hexPattern = /%[0-9a-f]{2}/gi
  const base64Regex = /[A-Za-z0-9+/]{20,}={0,2}/

  const hexMatches = body.match(hexPattern)

  if (hexMatches && hexMatches.length > 5) {
    signals.push({
      id: "excessive_percent_encoding",
      weight: 10,
      evidence: `${hexMatches.length} encoded bytes`
    })
  }

  if (base64Regex.test(body)) {
    signals.push({
      id: "base64_payload",
      weight: 8,
      evidence: "Base64-like payload detected"
    })
  }

  if (/%25/i.test(body)) {
    signals.push({
      id: "double_encoded_payload",
      weight: 10,
      evidence: "Possible double encoding"
    })
  }

  return signals
}