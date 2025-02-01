//https://designer.mocky.io/
// tags help ful to drill down the responses/ filter responses why caused delay etc. K6 having default tags

import http from 'k6/http';

export const options = {
    vus: 5,
    duration: '5s',
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status: 200}': ['p(95)<1000'], // system tags like status
        'http_req_duration{status: 201}': ['p(95)<1000']
    }

}

export default function(){
    let res=http.get('https://run.mocky.io/v3/07df747b-772d-4cf8-8602-592aaa2d56e9');
    res=http.get('https://run.mocky.io/v3/e92af8db-041b-4ffa-932d-7215eeb5401d?mocky-delay=2000ms')
}