import { SharedArray } from 'k6/data';

const data = new SharedArray('some name', function () {
  // All heavy work (opening and processing big files for example) should be done inside here.
  // This way it will happen only once and the result will be shared between all VUs, saving time and memory.
  const f = JSON.parse(open('./data.json'));
  return f; // f must be an array
});

export default function () {
    
  // Select a random element from the shared data array
  const element = data[Math.floor(Math.random() * data.length)];

  // Log the selected element
  console.log(`Selected user: ${JSON.stringify(element)}`);

}
