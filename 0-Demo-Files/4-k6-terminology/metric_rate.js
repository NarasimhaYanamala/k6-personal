import { Rate } from 'k6/metrics';
import http from 'k6/http';

let myRate = new Rate('my_rate');

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
    myRate.add(res.status === 200);  // Measure rate of successful requests
}
