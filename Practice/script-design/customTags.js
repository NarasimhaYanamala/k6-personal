

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

export const options = {
    vus: 5,
    duration: '5s',
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{page:order}': ['p(95)<250'],
        http_errors: ['count==0'],
        'http_errors{page:order}': ['count==0'],
        checks: ['rate>0.99'],
        'checks{page:order}': ['rate>0.99']
    }

}

let httpErrors = new Counter('http_errors');

export default function(){
    let res=http.get('https://run.mocky.io/v3/07df747b-772d-4cf8-8602-592aaa2d56e',
        {
            tags: {
                page: 'order'
            }
        }
    );
    
    if (!res.error) {
        httpErrors.add(1, {page: 'order'});
    }

    check(res, {
        'status code 200': (r) => r.status === 200
    });

    //submit order
    res=http.get('https://run.mocky.io/v3/e92af8db-041b-4ffa-932d-7215eeb5401d?mocky-delay=2000ms');

    if (res.error) {
        httpErrors.add(1, {page: 'order'});
    }

    check(res, {
        'status code 201': (r) => r.status === 201
    },{page: 'order'});

    sleep(1);

}