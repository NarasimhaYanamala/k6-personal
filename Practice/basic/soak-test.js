import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    stages: [
        {   duration: '5s', target: 1000  },
        {   duration: '12h', target: 1000  }, // 8 hr or 12 hr or 24 hr depends // memory leaks possible s
        {   duration: '5s', target: 0   }
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