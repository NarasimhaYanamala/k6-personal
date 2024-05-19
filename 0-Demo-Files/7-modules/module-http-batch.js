import http from 'k6/http';

const url1 = 'https://api.k6.io/v3/account/me';
const url2 = 'https://httpbin.test.k6.io/get';
const apiToken = 'f232831bda15dd233c53b9c548732c0197619a3d3c451134d9abded7eb5bb195';
const requestHeaders = {
  'User-Agent': 'k6',
  'Authorization': 'Token ' + apiToken,
};

export default function () {
  const res = http.batch([
    { method: 'GET', url: url1, params: { headers: requestHeaders } },
    { method: 'GET', url: url2 },
  ]);
}
