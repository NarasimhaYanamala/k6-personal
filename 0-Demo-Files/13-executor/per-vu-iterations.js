import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    scenarios: {
        per_vu_iterations_scenario: {
            executor: 'per-vu-iterations',
            vus: 10, // Number of VUs
            iterations: 5, // Number of iterations per VU
            maxDuration: '1m', // Maximum duration for the scenario
        },
    },
};

export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/');
    sleep(1);
}
