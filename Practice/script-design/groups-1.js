import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
    vus: 5,
    duration: '5s',
    thresholds: {
        http_req_duration: ['p(95)<5000'],
        'http_req_duration{expected_response:true}': ['p(95)<2000'],
        'group_duration{group:::Main page}': ['p(95)<8000'],
        'group_duration{group:::Main page::assets}': ['p(95)<2000'],
        'group_duration{group:::News page}': ['p(95)<6000'],
    }
}

export default function(){
    
    //group('main page', function() {});
    
    group('Main page', function() {
        let res = http.get('https://run.mocky.io/v3/d98aca18-bd04-4108-a72b-05031cf4d138?mocky-delay=5000ms');
        check(res, {
        'status 200 check': (r) => r.status === 200
        })
        group('assets', function(){
            http.get('https://run.mocky.io/v3/d98aca18-bd04-4108-a72b-05031cf4d138?mocky-delay=1000ms'); // assets of page , static pages , no changes for every user 
            http.get('https://run.mocky.io/v3/d98aca18-bd04-4108-a72b-05031cf4d138?mocky-delay=1000ms');

        })
        
    });
    
    group('News page', function() {
        http.get('https://run.mocky.io/v3/d98aca18-bd04-4108-a72b-05031cf4d138?mocky-delay=5000ms')

    });
    

    sleep(1)
}