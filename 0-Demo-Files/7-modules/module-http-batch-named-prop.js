import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const requests = {
    'front page': 'https://k6.io',
    'features page': {
      method: 'GET',
      url: 'https://k6.io/features',
      params: { headers: { 'User-Agent': 'k6' } },
    },
  };
  const responses = http.batch(requests);
  // when accessing results, we use the name of the request as index
  // in order to find the corresponding Response object
  check(responses['front page'], {
    'front page status was 200': (res) => res.status === 200,
  });
}
