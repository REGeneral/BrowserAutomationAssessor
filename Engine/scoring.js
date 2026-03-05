export function scoreSignals(signals) {

  let risk = 0
  const categories = new Set()

  for (const s of signals) {
    risk += s.weight
    categories.add(s.id.split("_")[0])
  }

  if (categories.size >= 4) {
    risk += 8
  }

  if (risk > 100) risk = 100

  return risk
}