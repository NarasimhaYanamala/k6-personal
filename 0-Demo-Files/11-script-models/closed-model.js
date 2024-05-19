import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        closed_model: {
            executor: 'per-vu-iterations',
            vus: 5, // number of VUs
            iterations: 10, // number of iterations per VU
        },
    },
};

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}
