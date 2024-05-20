import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        high_rate: {
            executor: 'constant-arrival-rate',
            rate: 100, // High iteration rate
            timeUnit: '1s',
            duration: '20s',
            preAllocatedVUs: 10,
            maxVUs: 20,
        },
    },
};

export default function () {
    http.get('https://test.k6.io');
    sleep(1); // Simulate some processing time
}
