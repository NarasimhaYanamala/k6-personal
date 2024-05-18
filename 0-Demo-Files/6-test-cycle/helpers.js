// helpers.js

export function setupTestData() {
    // Simulate setup data creation
    return { id: 1, name: 'Test Crocodile' };
}

export function cleanupTestData(data) {
    // Simulate cleanup tasks
    console.log(`Cleaning up data: ${JSON.stringify(data)}`);
}
