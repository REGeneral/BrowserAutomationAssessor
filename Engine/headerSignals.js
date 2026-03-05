export function chromeHeaderOrderSignals(req) {
  const signals = []
  const order = req.headerOrder

  const index = h => order.indexOf(h)

  const fetchCluster = [
    "sec-fetch-site",
    "sec-fetch-mode",
    "sec-fetch-dest"
  ]

  const clusterPositions = fetchCluster.map(index)

  const clusterValid =
    clusterPositions.every(i => i !== -1) &&
    clusterPositions[0] < clusterPositions[1] &&
    clusterPositions[1] < clusterPositions[2]

  if (!clusterValid) {
    signals.push({
      id: "fetch_metadata_cluster_invalid",
      weight: 8,
      evidence: "Sec-Fetch headers not grouped correctly"
    })
  }

  const originIndex = index("origin")
  const acceptIndex = index("accept")

  if (originIndex !== -1 && acceptIndex !== -1 && originIndex < acceptIndex) {
    signals.push({
      id: "origin_before_accept",
      weight: 6,
      evidence: "Origin header before Accept"
    })
  }

  return signals
}