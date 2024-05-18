import http from 'k6/http';

export default function () {
    let res = http.get('https://test-api.k6.io');
    console.log(`Response time: ${res.timings.duration} ms`);
}
