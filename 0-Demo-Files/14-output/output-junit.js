import http from 'k6/http';

// Use example functions to generate data
import { jUnit } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import k6example from 'https://raw.githubusercontent.com/grafana/k6/master/examples/thresholds_readme_example.js';

export default k6example;
export const options = {
  vus: 5,
  iterations: 10,
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
};

export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');

  return {
    'junit.xml': jUnit(data), // Transform summary and save it as a JUnit XML...
  };
}
