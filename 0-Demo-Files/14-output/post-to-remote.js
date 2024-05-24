import http from 'k6/http';

// use example function to generate data
import k6example from 'https://raw.githubusercontent.com/grafana/k6/master/examples/thresholds_readme_example.js';
export const options = { vus: 5, iterations: 10 };
export default k6example;

export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');

  // Send the results to some remote server or trigger a hook
  const resp = http.post('https://httpbin.test.k6.io/anything', JSON.stringify(data));
  if (resp.status != 200) {
    console.error('Could not send summary, got status ' + resp.status);
  }
}
