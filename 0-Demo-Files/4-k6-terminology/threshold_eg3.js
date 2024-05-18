import { Counter } from 'k6/metrics';
import { sleep } from 'k6';

let myCounter = new Counter('my_counter');

export let options = {
    thresholds: {
        'my_counter': ['count>100'], // The counter must exceed 100
    },
    vus: 2, // Number of virtual users
    duration: '10s', // Test duration
};

export default function () {
    // Add 1 to the counter for each iteration
    myCounter.add(1);

    // Print a message for every addition to simulate progress
    console.log('Added 1 to my_counter');

    // Sleep for a short period to simulate some work
    sleep(0.1);
}
