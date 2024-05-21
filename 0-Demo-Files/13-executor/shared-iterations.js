import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    scenarios: {
        shared_iterations_scenario: {
            executor: 'shared-iterations',
            vus: 10, // Number of VUs to run concurrently
            iterations: 100, // Total number of iterations to execute
            maxDuration: '1m', // Maximum time the test can run
        },
    },
};

export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/');
    sleep(1);
}
