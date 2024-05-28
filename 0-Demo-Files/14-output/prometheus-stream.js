import { check, sleep } from 'k6';
import http from 'k6/http';
import { Counter } from 'k6/metrics';

export let errorRate = new Counter('errors');

export let options = {
    vus: 5,
    iterations: 100,
    thresholds: {
        errors: ['rate<0.1'], // <10% errors
    },    
};

export default function () {
    let res = http.get('https://test-api.k6.io');
    check(res, { 'status was 200': (r) => r.status == 200 });
    if (res.status !== 200) {
        errorRate.add(1);
    }
    sleep(1);
}
