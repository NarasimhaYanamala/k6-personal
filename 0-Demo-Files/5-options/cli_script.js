import http from 'k6/http';

export const options = {
    vus: 10,
    duration: '30s',
    thresholds: {
        http_req_duration: ['avg<200', 'p(90)<300', 'max<500'],
    },
};

export default function () {
    let res = http.get('https://test-api.k6.io');
    console.log(`Response time: ${res.timings.duration} ms`);
}
