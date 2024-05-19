import http from 'k6/http';

export default function () {
  const params = {
    cookies: { my_cookie: 'value' },
    headers: { 'X-MyHeader': 'k6test' },
    redirects: 5,
    tags: { k6test: 'yes' },
  };
  const res = http.get('https://k6.io', params);
}
