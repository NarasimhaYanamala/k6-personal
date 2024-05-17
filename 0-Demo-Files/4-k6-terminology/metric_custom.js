import http from 'k6/http';
import { Counter, Gauge, Trend, Rate } from 'k6/metrics';
import { sleep } from 'k6';

// Custom metrics
let successfulRequests = new Counter('successful_requests');
let responseTimeGauge = new Gauge('response_time_gauge');
let responseTimeTrend = new Trend('response_time_trend');
let successRate = new Rate('success_rate');

// Load test configuration
export let options = {
    stages: [
        { duration: '10s', target: 5 }, // Ramp up to 5 users
        { duration: '20s', target: 5 },  // Stay at 5 users
        { duration: '10s', target: 0 },  // Ramp down to 0 users
    ],
    thresholds: {
        'successful_requests': ['count>100'], // We want at least 100 successful requests
        'response_time_gauge': ['value<500'], // Response time should be below 500ms
        'response_time_trend': ['p(95)<500'], // 95% of response times should be below 500ms
        'success_rate': ['rate>0.9'], // Success rate should be above 90%
    },
};

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
    
    // Check if the request was successful
    let wasSuccessful = res.status === 200;
    
    // Add data to custom metrics
    successfulRequests.add(wasSuccessful ? 1 : 0);
    responseTimeGauge.add(res.timings.duration);
    responseTimeTrend.add(res.timings.duration);
    successRate.add(wasSuccessful);
    
    // Simulate user think time
    sleep(1);
}
