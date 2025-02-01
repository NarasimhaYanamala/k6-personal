import http from 'k6/http';
import { sleep } from 'k6/http';

export const options = {
    vus: 2,
    duration: '2sec'

}
console.log('--- init stage ---');

export function setup(){
    console.log('--- setup stage ---');

}

export default function(){

    console.log('--- VU stage ---');
}

export function teardown(){
    console.log('--- teardown stage ---');
}