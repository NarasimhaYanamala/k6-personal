import http from 'k6/http';

export const options = {
  discardResponseBodies: true,

  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',

      // Start iterations per `timeUnit`
      startRate: 300,

      // Start `startRate` iterations per minute
      timeUnit: '20s',

      // Pre-allocate necessary VUs.
      preAllocatedVUs: 50,

      stages: [
        // Start 300 iterations per `timeUnit` for the first minute.
        { target: 300, duration: '20s' },
        { target: 600, duration: '20s' },
        { target: 600, duration: '20s' },
        { target: 60, duration: '20s' },
      ],
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
