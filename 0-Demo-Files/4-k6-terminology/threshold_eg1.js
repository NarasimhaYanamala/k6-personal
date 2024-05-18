import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    thresholds: {
        'http_req_duration': ['p(95)<500'], // 95% of requests must complete below 500ms
    },
};

export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/1/');
    sleep(1);
}