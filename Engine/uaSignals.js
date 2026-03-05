export function uaSignals(req) {
  const signals = [];
  const ua = req.ua;
  const ch = req.secChUa;

  const chromeUA = ua.match(/Chrome\/(\d+)/);
  const chUA = ch.match(/Chromium";v="(\d+)/);

  if (chromeUA && chUA) {
    const uaVer = parseInt(chromeUA[1]);
    const chVer = parseInt(chUA[1]);

    if (Math.abs(uaVer - chVer) > 2) {
      signals.push({
        id: "sec_ch_ua_mismatch",
        weight: 18,
        evidence: `UA Chrome/${uaVer} vs CH-UA ${chVer}`
      });
    }
  }

  if (!/Chrome|Firefox|Safari|Edg|Android|iPhone/.test(ua)) {
    signals.push({
      id: "non_standard_user_agent",
      weight: 10,
      evidence: ua
    });
  }

  return signals;
}