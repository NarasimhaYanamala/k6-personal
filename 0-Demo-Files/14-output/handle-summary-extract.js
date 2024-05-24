import http from 'k6/http';

export default function () {
  http.get('https://test.k6.io');
}

export function handleSummary(data) {
  const med_latency = data.metrics.iteration_duration.values.med;
  const latency_message = `The median latency was ${med_latency}\n`;

  return {
    stdout: latency_message,
  };
}
