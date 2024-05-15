import http from 'k6/http';
import { check, sleep } from 'k6';

// Configure the VU options
export let options = {
    vus: 10, // Fixed number of VUs
    //duration: '1m', // Fixed duration

    // Stages for ramp-up, sustained load, and ramp-down
    stages: [
        { duration: '30s', target: 10 }, // Ramp-up to 10 VUs
        { duration: '1m', target: 20 }, // Ramp-up to 20 VUs
        { duration: '1m', target: 20 }, // Stay at 20 VUs
        { duration: '30s', target: 10 }, // Ramp-down to 10 VUs
        { duration: '30s', target: 0 }, // Ramp-down to 0 VUs
    ],

    //iterations: 200, // Total number of script iterations
    vusMax: 20, // Maximum number of VUs during the test
    startVUs: 5, // Initial number of VUs at the start
};

export default function () {
    // Perform a GET request to the sample website
    let res = http.get('https://test.k6.io');

    // Validate the response status and response time
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time is < 500ms': (r) => r.timings.duration < 500,
    });

    // Simulate a user action delay
    sleep(1);
}
