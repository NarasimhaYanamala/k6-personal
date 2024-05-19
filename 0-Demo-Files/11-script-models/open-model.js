import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        open_model: {
            executor: 'constant-arrival-rate',
            rate: 5, // 5 iterations per second
            timeUnit: '1s', // rate is per second
            duration: '30s',
            preAllocatedVUs: 5, // initial pool of VUs
            maxVUs: 10, // maximum number of VUs
        },
    },
};

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}
