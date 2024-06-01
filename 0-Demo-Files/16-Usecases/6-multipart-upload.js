import http from 'k6/http';
import { check } from 'k6';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';

const img1 = open('image1.png', 'b');
const img2 = open('image2.jpg', 'b');
const txt = open('test.txt');

export default function () {
  const fd = new FormData();
  fd.append('someTextField', 'someValue');
  fd.append('aBinaryFile', { data: new Uint8Array(img1).buffer, filename: 'logo.png', content_type: 'image/png' });
  fd.append('anotherTextField', 'anotherValue');
  fd.append('images', http.file(img1, 'image1.png', 'image/png'));
  fd.append('images', http.file(img2, 'image2.jpg', 'image/jpeg'));
  fd.append('text', http.file(txt, 'text.txt', 'text/plain'));

  const res = http.post('https://httpbin.test.k6.io/post', fd.body(), {
    headers: { 'Content-Type': 'multipart/form-data; boundary=' + fd.boundary },
  });
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  const json = res.json();
  check(json, {
    'has someTextField': (j) => j.form.someTextField === 'someValue',
    'has anotherTextField': (j) => j.form.anotherTextField === 'anotherValue',
    'has aBinaryFile': (j) => j.files['aBinaryFile'] !== undefined,
    'has images[0]': (j) => j.files['images'][0] !== undefined,
    'has images[1]': (j) => j.files['images'][1] !== undefined,
    'has text': (j) => j.files['text'] !== undefined,
  });

}
