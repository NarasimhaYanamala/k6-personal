import { Gauge } from 'k6/metrics';
import http from 'k6/http';

let myGauge = new Gauge('my_gauge');

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
    myGauge.add(res.timings.duration);  // Capture response time
}
