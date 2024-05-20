import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        ramping_load: {
            executor: 'ramping-vus',
            startVUs: 1,
            stages: [
                { duration: '10s', target: 10 },
                { duration: '10s', target: 0 },
            ],
            gracefulRampDown: '5s', // Allow 5 seconds for iterations to complete during ramp down
        },
    },
};

export default function () {
    http.get('https://test.k6.io');
    sleep(1); // Simulate some processing time
}
