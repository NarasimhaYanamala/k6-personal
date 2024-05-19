import http from 'k6/http';
import { parseHTML } from 'k6/html';

export default function () {
    let res = http.get('https://test.k6.io');
    let doc = parseHTML(res.body);
    let title = doc.find('title').text();
    console.log(`Page title: ${title}`);
}
