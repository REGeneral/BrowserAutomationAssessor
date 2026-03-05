export function casingSignals(rawHeaders) {
  const signals = []

  const expectedCase = {
    "user-agent": "User-Agent",
    "accept": "Accept",
    "accept-language": "Accept-Language",
    "accept-encoding": "Accept-Encoding",
    "referer": "Referer",
    "origin": "Origin",
    "sec-fetch-site": "Sec-Fetch-Site",
    "sec-fetch-mode": "Sec-Fetch-Mode",
    "sec-fetch-dest": "Sec-Fetch-Dest",
    "sec-ch-ua": "sec-ch-ua",
    "sec-ch-ua-mobile": "sec-ch-ua-mobile",
    "sec-ch-ua-platform": "sec-ch-ua-platform"
  }

  let anomalies = 0

  for (const header of rawHeaders) {
    const lower = header.toLowerCase()

    if (expectedCase[lower] && expectedCase[lower] !== header) {
      anomalies++
    }
  }

  if (anomalies >= 2) {
    signals.push({
      id: "header_casing_anomaly",
      weight: 8,
      evidence: `${anomalies} headers use abnormal casing`
    })
  }

  return signals
}