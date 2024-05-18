import http from 'k6/http';
import { Trend } from 'k6/metrics';
import { sleep } from 'k6';

let responseTimeTrend = new Trend('response_time_trend');

export let options = {
    thresholds: {
        'response_time_trend': ['p(95)<300'], // 95% of values must be below 300ms
    },
    vus: 1, // Number of virtual users
    duration: '10s', // Test duration
};

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
    responseTimeTrend.add(res.timings.duration);

    // Print the response time for each request
    console.log(`Response time: ${res.timings.duration} ms`);

    // Sleep for a short period to simulate some work
    sleep(0.1);
}
