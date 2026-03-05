export function protocolSignals(req) {
  const signals = [];

  if (
    req.contentLength !== null &&
    req.contentLength !== req.bodyLength
  ) {
    signals.push({
      id: "content_length_mismatch",
      weight: 20,
      evidence: `Header ${req.contentLength} vs body ${req.bodyLength}`
    });
  }

  return signals;
}