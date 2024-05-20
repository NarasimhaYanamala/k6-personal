import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        graceful_stop_scenario: {
            executor: 'constant-vus',
            vus: 5,
            duration: '10s',
            gracefulStop: '5s', // Allow 5 seconds for iterations to complete before stopping
        },
    },
};

export default function () {
    http.get('https://test.k6.io');
    sleep(1); // Simulate some processing time
}
