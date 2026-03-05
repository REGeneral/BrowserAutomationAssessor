export function explainRisk(risk, signals) {

  let classification = "normal"

  if (risk >= 75) classification = "automation likely"
  else if (risk >= 45) classification = "high risk"
  else if (risk >= 15) classification = "suspicious"

  const sorted = [...signals].sort((a,b)=>b.weight-a.weight)

  const topSignals = sorted.slice(0,3)

  return {

    classification,

    summary: `Risk score ${risk}/100 indicating ${classification}.`,

    topFindings: topSignals.map(s => ({
      signal: s.id,
      reason: s.evidence,
      weight: s.weight
    })),

    signalCount: signals.length

  }

}