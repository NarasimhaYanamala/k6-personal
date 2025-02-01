import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
    vus: 5,
    duration: '5s',
    thresholds: {
        http_req_duration: ['p(95)<2000'],
        'group_duration{group:::Main page}': ['p(95)<200'],
        'group_duration{group:::Main page::assets}': ['p(95)<200'],
        'group_duration{group:::News page}': ['p(95)<200'],
    }
}

export default function(){
    
    //group('main page', function() {});
    
    group('Main page', function() {
        let res = http.get('https://test.k6.io/');
        check(res, {
        'status 200 check': (r) => r.status === 200
        })
        group('assets', function(){
            http.get('https://test.k6.io/static/css/site.css'); // assets of page , static pages , no changes for every user 
            http.get('https://test.k6.io/static/js/prisms.js');

        })
        
    });
    
    group('News page', function() {
        http.get('https://test.k6.io/newds.php')

    });
    

    sleep(1)
}