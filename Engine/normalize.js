export function normalizeRequest(req) {
  const headers = {}
  const headerOrder = []
  const rawHeaderNames = []

  for (const [key, value] of Object.entries(req.headers || {})) {
    rawHeaderNames.push(key)

    const lower = key.toLowerCase()
    headers[lower] = value
    headerOrder.push(lower)
  }

  const body = req.body || ""
  const bodyLength = Buffer.byteLength(body)

  return {
    headers,
    headerOrder,
    rawHeaderNames,
    path: req.path || "/",
    body,
    bodyLength,
    contentLength: headers["content-length"]
      ? parseInt(headers["content-length"])
      : null,
    ua: headers["user-agent"] || "",
    secChUa: headers["sec-ch-ua"] || ""
  }
}