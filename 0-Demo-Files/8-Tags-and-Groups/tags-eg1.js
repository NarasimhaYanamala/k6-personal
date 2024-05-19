import http from 'k6/http';
import { check, sleep } from 'k6';

// Define tags within the params object
let params = {
    tags: { name: 'homepage' }
};

export default function () {
    // Perform the HTTP GET request with the params
    let res = http.get('https://test.k6.io', params);

    // Access the tags from the params directly
    let tags = params.tags;
    //let tags = res.timings.tags;


    // Perform checks and include tags in the output
    check(res, {
        [`is status 200 for ${tags.name}`]: (r) => r.status === 200,
        [`response time for ${tags.name} is below 200ms`]: (r) => r.timings.duration < 200,
    });

    // Log the tags and response status
    console.log(`Tags: ${JSON.stringify(tags)}, Status: ${res.status}`);
    
    // Sleep for a short duration to simulate user think time
    sleep(1);
}
