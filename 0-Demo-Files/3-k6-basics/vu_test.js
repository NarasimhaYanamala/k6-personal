import http from 'k6/http';
import { check, sleep } from 'k6';

// Options for configuring VUs and stages
export let options = {
    stages: [
        { duration: '10s', target: 10 }, // Ramp-up to 10 VUs
        { duration: '1m', target: 10 }, // Stay at 10 VUs
        { duration: '20s', target: 0 }, // Ramp-down to 0 VUs
    ],
};

export default function () {
    // HTTP GET request to the sample website
    let res = http.get('https://test.k6.io');
    
    // Checking the response status and response time
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time is < 500ms': (r) => r.timings.duration < 500,
    });
    
    // Simulate a user action delay
    sleep(1);
}
