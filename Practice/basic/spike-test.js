//sudden spike in load
// increment fully in 1 min is required to do sike test
// middle stage is not required // ramp up and ramp down is VERY STEEP
// 4 to 5 times load more than stress test is one way to identify traffic /target no. of users ..
// after system crashes how the system recovers is imporatnt to know.
// not required to do all applications in general
import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    stages: [
        {   duration: '1m', target: 10000  }, // increment fully in 1 min is required to do sike test
         // middle stage is not required // ramp up and ramp down is VERY STEEP
        {   duration: '1m', target: 0   }
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