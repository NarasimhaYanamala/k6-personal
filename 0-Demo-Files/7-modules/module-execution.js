import { vu, scenario } from 'k6/execution';

export default function () {
    console.log(`VU ID: ${vu.idInTest}`);
    console.log(`Scenario Name: ${scenario.name}`);
}
