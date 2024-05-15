//Fixed Number of VUs for a Fixed Duration:
export let options = {
    vus: 10, // Number of VUs
    duration: '1m', // Test duration
};

//Stages for Ramp-Up and Ramp-Down:
export let options1 = {
    stages: [
        { duration: '30s', target: 20 }, // Ramp-up to 20 VUs
        { duration: '1m', target: 20 }, // Stay at 20 VUs
        { duration: '30s', target: 0 }, // Ramp-down to 0 VUs
    ],
};

//Fixed Number of Iterations:
export let options2 = {
    iterations: 100, // Total number of iterations
    vus: 10, // Number of VUs
};

