import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { sleep } from 'k6';

let successRate = new Rate('success_rate');

export let options = {
    thresholds: {
        'success_rate': ['rate>0.95'], // The success rate must be above 95%
    },
    vus: 1, // Number of virtual users
    duration: '10s', // Test duration
};

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
    successRate.add(res.status === 200);

    // Print the status and success rate for each request
    console.log(`Request status: ${res.status}, Success recorded: ${res.status === 200}`);

    // Sleep for a short period to simulate some work
    sleep(0.1);
}
