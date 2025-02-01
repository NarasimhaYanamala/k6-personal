import http from 'k6/http';
import { check }  from 'k6'

export const options  = {
    stages: [
        
    ]
}

//hard codes value is true in below case
/*
export default function() {
    //http.get('https://test.k6.io');
    const res = http.get('https://test.k6.io');
    console.log(res.status);
    check (true, {
        ' true value is true': (value) => value === true
    });
    //console.log(res.body);
}
 */

////providing resonse comes from server
export default function() {
    const res1= http.get('https://test.k6.io/');

    check (res1, {
        'status is 200': (r) => r.status === 200,
        'start page msg validation': (r) => r.body.includes('Collection of simple web-pages suitable for load testing') === true
    })



    check (res1, {
        'contacts page address line': (r) => r.body.includes('118 46 Stockholm, Sweden') === true
    })


    //118 46 Stockholm, Sweden
    
}