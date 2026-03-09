# Browser Consistency & Bot Risk Engine
A lightweight browser consistency analysis engine that detects automation by analyzing HTTP request behaviour.

The engine evaluates requests across multiple layers including:
```
Protocol Integrity
Browser fingerprint consistency
Header structure
Request evasion techniques
Payload anomalies
```
Each request is scored using an explainable risk scoring system that highlights the signals contributing to detection.

### Why this project exists
Many bot detection systems rely heavily on IP reputation, ASN intelligence, or behavioural analysis.

I built this project to focus on offline request analysis, demonstrating how automated traffic can be detected purely through browser consistency validation and protocol anomalies.

The goal was to explore techniques used in bot mitigation, abuse detection, and web security systems.

### Example Detection
Example Malicious Request:

URL Path:
```
/%2e%2e/%2e%2e/admin
```
Signals detected:
```
content_length_mismatch
sec_ch_ua_mismatch
incomplete_header_cluster
double_encoded_payload
header_casing_anomaly
```

Result:
```
Risk Score: 97 / 100
Classification: automation likely
```

Explanation output:
```json
{
  "risk": 97,
  "explanation": {
    "classification": "automation likely",
    "summary": "Risk score 97/100 indicating automation likely.",
    "topFindings": [
      {
        "signal": "content_length_mismatch",
        "reason": "Header 10 vs body 24",
        "weight": 20
      },
      {
        "signal": "sec_ch_ua_mismatch",
        "reason": "UA Chrome/123 vs CH-UA 110",
        "weight": 18
      },
      {
        "signal": "incomplete_header_cluster",
        "reason": "1/3 headers present (sec-ch-ua,sec-ch-ua-mobile,sec-ch-ua-platform)",
        "weight": 12
      }
    ],
    "signalCount": 8
  }
```

### Detection Signals

The engine currently evaluates requests using multiple independent signals.

### Protocol Integrity

Detects inconsistencies in HTTP request construction.

Examples:
```
Content-Length mismatch
Malformed payload encoding
```
### Browser Fingerprint Consistency

Validates that the request actually behaves like the browser claims to be.

Examples:
```
User-Agent vs Sec-ch-ua mismatch
Incomplete client hint header clusters
Header Structure Validation
```
### Browsers send headers in predictable patterns and clusters.

The engine evaluates:
```
Header casing anomalies
Fetch metadata header clusters
Header ordering patterns
```
### Request Evasion Detection

Identifies common request obfuscation techniques used in automation tools.

Examples:
```
Percent encoded paths
Double encoded payloads
Traversal patterns
```
### Payload Analysis

Detects suspicious encoding patterns inside request payloads.

Examples:
```
Excessive percent encoding
Double encoded payloads
Base64 like payloads
```

### Browser Profiles
The engine evaluates requests against expected browser behavior using browser profiles.

Current Profiles:
```
Chrome
Firefox
```
Profiles define expected:
```
Header clusters
Encoding capabilities
Header patterns
```
### Risk Scoring
Signals are weighted and combined into a risk score between 0 and 100.

Classification levels:
```
0–14   Normal
15–44  Suspicious
45–74  High Risk
75+    Automation Likely
```
Each detection includes an explainable output highlighting the most significant signals.

### Running the project
Example test execution:
```
node test.js
```
### Example output:

```json
==============================
Suspicious bot request
==============================
{
  "risk": 18,
  "signals": [
    {
      "id": "fetch_metadata_cluster_invalid",
      "weight": 8,
      "evidence": "Sec-Fetch headers not grouped correctly"
    },
    {
      "id": "non_standard_user_agent",
      "weight": 10,
      "evidence": "Mozilla/5.0"
    }
  ],
  "explanation": {
    "classification": "suspicious",
    "summary": "Risk score 18/100 indicating suspicious.",
    "topFindings": [
      {
        "signal": "non_standard_user_agent",
        "reason": "Mozilla/5.0",
        "weight": 10
      },
      {
        "signal": "fetch_metadata_cluster_invalid",
        "reason": "Sec-Fetch headers not grouped correctly",
        "weight": 8
      }
    ],
    "signalCount": 2
  }
}

==============================
Clearly malicious request
==============================
{
  "risk": 97,
  "signals": [
    {
      "id": "percent_encoding",
      "weight": 3,
      "evidence": "Path contains percent encoding"
    },
    {
      "id": "fetch_metadata_cluster_invalid",
      "weight": 8,
      "evidence": "Sec-Fetch headers not grouped correctly"
    },
    {
      "id": "sec_ch_ua_mismatch",
      "weight": 18,
      "evidence": "UA Chrome/123 vs CH-UA 110"
    },
    {
      "id": "content_length_mismatch",
      "weight": 20,
      "evidence": "Header 10 vs body 24"
    },
    {
      "id": "header_casing_anomaly",
      "weight": 8,
      "evidence": "2 headers use abnormal casing"
    },
    {
      "id": "excessive_percent_encoding",
      "weight": 10,
      "evidence": "8 encoded bytes"
    },
    {
      "id": "double_encoded_payload",
      "weight": 10,
      "evidence": "Possible double encoding"
    },
    {
      "id": "incomplete_header_cluster",
      "weight": 12,
      "evidence": "1/3 headers present (sec-ch-ua,sec-ch-ua-mobile,sec-ch-ua-platform)"
    }
  ],
  "explanation": {
    "classification": "automation likely",
    "summary": "Risk score 97/100 indicating automation likely.",
    "topFindings": [
      {
        "signal": "content_length_mismatch",
        "reason": "Header 10 vs body 24",
        "weight": 20
      },
      {
        "signal": "sec_ch_ua_mismatch",
        "reason": "UA Chrome/123 vs CH-UA 110",
        "weight": 18
      },
      {
        "signal": "incomplete_header_cluster",
        "reason": "1/3 headers present (sec-ch-ua,sec-ch-ua-mobile,sec-ch-ua-platform)",
        "weight": 12
      }
    ],
    "signalCount": 8
  }
}
```
### Future Improvements
Potential Extensions:
```
TLS fingerprint validation (JA3/JA4 style detection)
Header entropy fingerprinting
Session consistency analysis
Browser behaviour modeling
ASN and proxy intelligence integration
```
### Why this matters
Modern abuse detection systems rely on multiple weak signals combined together. This project demonstrates how automated traffic can be detected through browser consistency analysis and protocol anomalies, even without external threat intelligence.

This project explores how automated traffic can be identified using browser consistency validation and protocol anomaly detection. It demonstrates practical familiarity with:
```
HTTP Protocol Behaviour
Browser fingerprinting techniques
Automation detection
Request anomaly analysis
Risk scoring used in bot mitigation systems
```
