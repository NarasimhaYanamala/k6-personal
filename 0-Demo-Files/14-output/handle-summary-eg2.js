import http from 'k6/http';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export default function () {
  http.get('https://test.k6.io');
}

export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }), // Show the text summary to stdout...
   // 'stdout': JSON.stringify(data, null, 2), // Print the summary to standard output
   // 'stderr':'Error message :CUSTOM_CODE',
    './test-path/summary.json': JSON.stringify(data), // ...and a JSON file with all the details.
  };
}