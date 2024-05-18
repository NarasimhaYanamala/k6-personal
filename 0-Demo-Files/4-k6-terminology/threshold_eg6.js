import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    thresholds: {
        'http_req_duration': ['avg<200', 'p(90)<300', 'max<500'],
        'http_req_failed': ['rate<0.01'], // Less than 1% of requests should fail
    },
    vus: 10, // Number of virtual users
    duration: '10s', // Test duration
};

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
    
    // Check if the request was successful
    let success = check(res, {
        'status is 200': (r) => r.status === 200,
    });
    
    // Log the result to the console
    console.log(`Request status: ${res.status}, Success: ${success}`);

    // Sleep for a short period to simulate user wait time
    sleep(1);
}
