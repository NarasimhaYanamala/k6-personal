import { check } from 'k6';
import encoding from 'k6/encoding';

export default function () {
  const str = 'hello world';
  const enc = 'aGVsbG8gd29ybGQ=';
  const buf = new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]).buffer;
  check(null, {
    'is encoding string correct': () => encoding.b64encode(str) === enc,
    'is encoding ArrayBuffer correct': () => encoding.b64encode(buf) === enc,
  });
}
