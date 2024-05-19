import { group } from 'k6';
import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';

// Define custom metrics
let httpReqs = new Counter('http_reqs');

export default function () {
    group('Homepage', function () {
        let params = {
            tags: { name: 'homepage' }
        };
        let res = http.get('https://test.k6.io', params);

        // Access the tags from the params directly
        let tags = params.tags;

        // Perform checks and include tags in the output
        let checkResult = check(res, {
            [`is status 200 for ${tags.name}`]: (r) => r.status === 200,
        });

        // Log the tags and response status
        console.log(`Group: Homepage, Tags: ${JSON.stringify(tags)}, Status: ${res.status}, Check: ${checkResult}`);

        // Record custom metric with tags
        httpReqs.add(1, tags);
    });

    group('Contact Page', function () {
        let params = {
            tags: { name: 'contact_page' }
        };
        let res = http.get('https://test.k6.io/contact', params);

        // Access the tags from the params directly
        let tags = params.tags;

        // Perform checks and include tags in the output
        let checkResult = check(res, {
            [`is status 200 for ${tags.name}`]: (r) => r.status === 200,
        });

        // Log the tags and response status
        console.log(`Group: Contact Page, Tags: ${JSON.stringify(tags)}, Status: ${res.status}, Check: ${checkResult}`);

        // Record custom metric with tags
        httpReqs.add(1, tags);
    });
}
