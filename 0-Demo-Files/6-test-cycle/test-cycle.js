import http from 'k6/http';
import { check, sleep } from 'k6';
import { setupTestData, cleanupTestData } from './helpers.js';

export let options = {
    stages: [
        { duration: '10s', target: 5 },
        { duration: '20s', target: 5 },
        { duration: '10s', target: 0 },
    ],
};

const url = 'https://test-api.k6.io/public/crocodiles/';

export function setup() {
    let setupData = setupTestData();
    return { setupData, url };
}

export default function (data) {
    let res = http.get(`${data.url}${data.setupData.id}/`);
    check(res, {
        'status was 200': (r) => r.status === 200,
    });
    sleep(1);
}

export function teardown(data) {
    cleanupTestData(data.setupData);
}
