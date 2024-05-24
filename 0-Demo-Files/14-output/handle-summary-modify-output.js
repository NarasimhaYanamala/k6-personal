import http from 'k6/http';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

export default function () {
  http.get('https://test.k6.io');
}

export function handleSummary(data) {
  delete data.metrics['http_req_duration{expected_response:true}'];

  for (const key in data.metrics) {
    if (key.startsWith('iteration')) delete data.metrics[key];
  }

  return {
    stdout: textSummary(data, { indent: '→', enableColors: true }),
  };
}
