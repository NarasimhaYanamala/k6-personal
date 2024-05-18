import http from 'k6/http';

export let options = {
    thresholds: {
        'http_req_duration{staticAsset:true}': ['p(95)<300'], // 95% of static asset requests must be below 300ms
    },
    vus: 10, // Number of virtual users
    duration: '10s', // Test duration
};

export default function () {
    http.get('https://test-api.k6.io/static/some-file.js', { tags: { staticAsset: 'true' } });
}
