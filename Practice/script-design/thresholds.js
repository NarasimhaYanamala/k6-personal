import http from 'k6/http';
import { sleep, check }  from 'k6';
import exec from 'k6/execution';


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
      checks: ['rate>=0.999'] //rate type
   }
}



export default function() {
    const res1= http.get('https://test.k6.io/' + (exec.scenario.iterationInTest == 1 ? 'foo' : ''));
    // console.log(exec.scenario.iterationInTest);

    check (res1, {
        'status is 200': (r) => r.status === 200,
        'start page msg validation': (r) => r.body.includes('Collection of simple web-pages suitable for load testing') === true
    })
   
}