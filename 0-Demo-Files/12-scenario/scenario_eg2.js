import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        simple_scenario: {
            executor: 'constant-vus',
            vus: 10, // Number of VUs to run concurrently
            duration: '30s', // Duration of the test
        },
    },
};

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}
