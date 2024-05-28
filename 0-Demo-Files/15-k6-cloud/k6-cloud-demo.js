import { sleep } from 'k6'
import http from 'k6/http'


// See https://k6.io/docs/using-k6/options
export const options = {
 stages: [
   { duration: '1m', target: 20 },
   { duration: '1m', target: 20 },
   { duration: '1m', target: 0 },
 ],
 thresholds: {
   http_req_failed: ['rate<0.05'], // http errors should be less than 5%
  
 }
}


export default function main() {
 let response = http.get('https://test-api.k6.io/public/crocodiles/')
 sleep(1)
}