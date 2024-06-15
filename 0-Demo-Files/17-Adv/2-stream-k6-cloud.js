import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const url = 'https://httpbin.test.k6.io/get';
  const res = http.get(url);
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
