import http from 'k6/http';
import { check } from 'k6';

export default function() {
  let url = 'https://httpbin.test.k6.io/post';
  let response = http.post(url, 'Hello world!');
  let result = check(response, {
      //'Application says hello': (r) => r.body.includes('Bonjour!')
      'Application says hello': (r) => r.body.includes('Hello world!')
  });

  if (result) {
    console.log(`Check success. Response body was: ${response.body}`);
  }
  else
  {
    console.log(`Check failed. Response body was: ${response.body}`);
  }
  
}
