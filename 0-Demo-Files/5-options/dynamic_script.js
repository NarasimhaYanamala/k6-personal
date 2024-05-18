import http from 'k6/http';

export const options = {
    vus: __ENV.K6_VUS || 10,
    duration: __ENV.K6_DURATION || '30s',
    thresholds: {
        http_req_duration: ['avg<200', 'p(90)<300', 'max<500'],
    },
    userAgent: __ENV.MY_USER_AGENT || 'MyK6UserAgent',
};

export default function () {
    let res = http.get('https://test-api.k6.io', { headers: { 'User-Agent': options.userAgent } });
    console.log(`Response time: ${res.timings.duration} ms`);
}
