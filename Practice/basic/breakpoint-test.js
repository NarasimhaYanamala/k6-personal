//gradual increment is required to do - Where application breaks
// when to stop - error rate is high and response times un-acceptable
// monitoring metrics, observability tool very much required to stop the test. 
// infra engineers required 
import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    stages: [
        {   duration: '2h', target: 1000  } // only one stage
    ]
}

export default function (){
    
    http.get('https://test.k6.io');
    sleep(1)
    http.get('https://test.k6.io/contact.php');
    sleep(2)
    http.get('https://test.k6.io/news.php');
    sleep(2)
}