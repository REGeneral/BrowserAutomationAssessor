export function pathSignals(req) {
  const signals = [];
  const path = req.path;

  if (/%[0-9a-f]{2}/i.test(path)) {
    signals.push({
      id: "percent_encoding",
      weight: 3,
      evidence: "Path contains percent encoding"
    });
  }

  if (/%25/i.test(path)) {
    signals.push({
      id: "double_encoding",
      weight: 8,
      evidence: "Possible double encoding detected"
    });
  }

  if (/\.\.\//.test(path) || /\.\.\\/.test(path)) {
    signals.push({
      id: "path_traversal",
      weight: 15,
      evidence: "Traversal patterns detected"
    });
  }

  if (/;%5c/i.test(path)) {
    signals.push({
      id: "encoded_backslash_traversal",
      weight: 12,
      evidence: "Encoded traversal detected"
    });
  }

  return signals;
}