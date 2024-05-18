import http from 'k6/http';
import exec from 'k6/execution';


export const options = {
    stages: [
        { duration: '3s', target: 5 },
        { duration: '4s', target: 10 },
    ],
};

export default function () {
    console.log(exec.test.options.scenarios.default.stages[0].target); // 100
    let res = http.get('https://test-api.k6.io');
    console.log(`Response time: ${res.timings.duration} ms`);
}
