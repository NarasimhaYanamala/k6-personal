import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://httpbin.test.k6.io/cookies/set?my_cookie=hello%20world', {
    redirects: 0,
  });
  check(res, {
    "has cookie 'my_cookie'": (r) => r.cookies.my_cookie.length > 0,
    'cookie has correct value': (r) => r.cookies.my_cookie[0].value === 'hello world',
  });
}
