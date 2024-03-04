export function generateHours(startTime: number, finishTime: number) {
  const hours = [];
  for (let i = startTime - 1; i < finishTime; i++) {
    hours.push(String(i + 1) + ':00');
  }

  return hours;
}
