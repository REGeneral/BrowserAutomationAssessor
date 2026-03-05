export function languageSignals(req) {
  const signals = []

  const lang = req.headers["accept-language"]

  if (!lang) return signals

  const parts = lang.split(",")

  const langRegex = /^[a-z]{2}(-[A-Z]{2})?(;q=0\.[0-9])?$/

  let invalid = 0

  for (const part of parts) {
    const trimmed = part.trim()

    if (!langRegex.test(trimmed)) {
      invalid++
    }
  }

  if (invalid > 0) {
    signals.push({
      id: "accept_language_structure_invalid",
      weight: 7,
      evidence: lang
    })
  }

  if (parts.length > 6) {
    signals.push({
      id: "accept_language_excessive",
      weight: 5,
      evidence: `${parts.length} languages`
    })
  }

  return signals
}