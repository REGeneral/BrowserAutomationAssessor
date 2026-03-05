export function profileSignals(req, profile) {

  const signals = []

  if (!profile) return signals

  for (const cluster of profile.requiredHeaderClusters) {

    const present = cluster.filter(h => req.headers[h]).length

    if (present > 0 && present < cluster.length) {
      signals.push({
        id: "incomplete_header_cluster",
        weight: 12,
        evidence: `${present}/${cluster.length} headers present (${cluster.join(",")})`
      })
    }
  }

  const enc = req.headers["accept-encoding"]

  if (enc) {

    for (const expected of profile.expectedEncodings) {

      if (!enc.includes(expected)) {
        signals.push({
          id: "missing_expected_encoding",
          weight: 5,
          evidence: `${expected} missing`
        })
      }

    }

  }

  return signals

}