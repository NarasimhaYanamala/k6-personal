import { group } from 'k6';
import http from 'k6/http';
import { check } from 'k6';

export default function () {
    group('Homepage', function () {
        let res = http.get('https://test.k6.io');
        check(res, {
            'is status 200': (r) => r.status === 200,
        });
    });

    group('Contact Page', function () {
        let res = http.get('https://test.k6.io/contact');
        check(res, {
            'is status 200': (r) => r.status === 200,
        });
    });
}
