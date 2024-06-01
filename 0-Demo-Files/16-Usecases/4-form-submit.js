import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  // Request page containing a form
  let res = http.get('https://httpbin.test.k6.io/forms/post');

  // Submit the form with predefined values
  res = res.submitForm({
    formSelector: 'form',
    fields: {
      comments: 'near stall',
      custemail: 'adsf1@sf.cm',
      custname: 'name1',
      custtel: '234234',
      delivery: '11:00',
      size: 'small',
      topping: 'bacon',
    },
  });

  // Verify the response contains the submitted form values
  check(res, {
    'form submitted successfully': (r) => r.status === 200,
    'comments is correct': (r) => r.json().form.comments === 'near stall',
    'custemail is correct': (r) => r.json().form.custemail === 'adsf@sf.cm',
    'custname is correct': (r) => r.json().form.custname === 'name',
    'custtel is correct': (r) => r.json().form.custtel === '234234',
    'delivery is correct': (r) => r.json().form.delivery === '11:00',
    'size is correct': (r) => r.json().form.size === 'small',
    'topping is correct': (r) => r.json().form.topping === 'bacon',
  });

  sleep(3);
}
