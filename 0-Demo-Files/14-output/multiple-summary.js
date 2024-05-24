import http from 'k6/http';

export default function () {
  http.get('https://test.k6.io');
}

export function handleSummary(data) {
  return {
    'stdout': JSON.stringify(data, null, 2), // Print the summary to the console
    'summary.json': JSON.stringify(data),    // Write the summary to a JSON file
    'summary.html': generateHTMLSummary(data), // Write the summary to an HTML file
  };
}

function generateHTMLSummary(data) {
  // Convert the summary data to an HTML string
  let html = `<html><body><h1>Test Summary</h1>`;
  html += `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  html += `</body></html>`;
  return html;
}