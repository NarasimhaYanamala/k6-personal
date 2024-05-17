import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/1/');

    sleep(1);  // Sleep for 1 second to simulate user think time
}
