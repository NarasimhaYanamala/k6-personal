import { Counter } from 'k6/metrics';
import http from 'k6/http';

let myCounter = new Counter('my_counter');

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
    myCounter.add(1);  // Increment counter
    
}
