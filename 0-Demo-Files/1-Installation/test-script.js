// save this as test-script.js
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    vus: 10, // number of virtual users
    duration: '30s', // duration of the test
};

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}
