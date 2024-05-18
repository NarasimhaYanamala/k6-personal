import http from 'k6/http';
import { group } from 'k6';

export let options = {
    thresholds: {
        'group_duration{group:::my_group}': ['avg<400'], // Avg duration of this group must be below 400ms
    },
    vus: 10, // Number of virtual users
    duration: '10s', // Test duration
};

export default function () {
    group('my_group', function () {
        let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
        console.log(`Response time: ${res.timings.duration} ms`);
    });
}
