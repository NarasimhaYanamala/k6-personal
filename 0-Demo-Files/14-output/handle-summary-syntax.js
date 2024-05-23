import http from 'k6/http';

export default function () {
  http.get('https://test.k6.io');
}

export function handleSummary(data) {
 return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }), // Show the text summary to stdout...
    'other/path/to/summary.json': JSON.stringify(data), // and a JSON with all the details...
  };
}
