import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    thresholds: {
        http_req_duration: ['avg<200', 'p(90)<300', 'max<500'],
    },
};

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}
