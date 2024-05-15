import http from 'k6/http';
import { check, sleep } from 'k6';

// Optional setup function
export function setup() {
  // Initialize data if needed
  console.log('Setup: Initializing data...');
}

// Main test logic
export default function () {
  // Make a GET request to a test API
  let res = http.get('https://test-api.k6.io');

  // Check if the response status is 200
  check(res, { 'status was 200': (r) => r.status == 200 });

  // Sleep for 1 second to simulate user think time
  sleep(1);
}

// Optional teardown function
export function teardown() {
  // Cleanup if needed
  console.log('Teardown: Cleaning up...');
}
