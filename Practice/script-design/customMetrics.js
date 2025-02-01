import http from 'k6/http';
import { sleep, check }  from 'k6';
import exec from 'k6/execution';
import { Counter, Trend } from 'k6/metrics'

export const options  = {
   vus: 10,
   duration: '10s',
   thresholds: {
      http_req_duration: ['p(95)<100'], //trend type
      http_req_duration: ['max<2000'], //trend - max should be less than 2 sec
      http_req_failed: ['rate<0.01'], //rate type // only aggregation method
      http_reqs: ['count>100'], //counter type
      http_reqs: ['rate>5'], //rate

      vus: ['value>9'], //gauge type
      checks: ['rate>=0.99'], //rate type
      my_Counter: ['count>10'],
      response_time_news_page: ['p(95)<150', 'p(99)<200']
   }
}

//defining metric - cointer

let myCounter = new Counter("my_Counter");
let newsPageResponseTrend= new Trend('response_time_news_page');

export default function() {
    let res= http.get('https://test.k6.io/');  // Instead of using CONST If we use LET same variable we can use other places aswell 
    myCounter.add(1);
    // console.log(exec.scenario.iterationInTest);

    check (res, {
        'status is 200': (r) => r.status === 200,
        'start page msg validation': (r) => r.body.includes('Collection of simple web-pages suitable for load testing') === true
    })

    res = http.get('https://test.k6.io/news.php');
    newsPageResponseTrend.add(res.timings.duration);
    sleep(1)
}