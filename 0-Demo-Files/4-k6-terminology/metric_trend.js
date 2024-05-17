import { Trend } from 'k6/metrics';
import http from 'k6/http';

let myTrend = new Trend('my_trend');

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
    myTrend.add(res.timings.duration);  // Record response time trend
}
