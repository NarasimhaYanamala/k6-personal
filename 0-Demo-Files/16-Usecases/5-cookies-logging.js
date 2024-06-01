import http from 'k6/http';

function logCookie(cookie) {
  console.log(
    `${cookie.name}: ${cookie.value}\n\tdomain: ${cookie.domain}\n\tpath: ${cookie.path}\n\texpires: ${cookie.expires}\n\thttpOnly: ${cookie.http_only}`
  );
}

export default function () {
  const res = http.get('https://www.google.com/');

  // Method 1: Using for-loop
  for (const name in res.cookies) {
    if (res.cookies.hasOwnProperty(name)) {
      logCookie(res.cookies[name][0]);
    }
  }

  // Method 2: Using ES6 Map
  new Map(Object.entries(res.cookies)).forEach((v, k) => logCookie(v[0]));
}
