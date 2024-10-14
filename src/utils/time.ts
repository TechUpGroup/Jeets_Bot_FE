export const calulatorTimer = (startTime: number, endTime: number) => {
  const remainingTime = endTime > startTime ? endTime - startTime : 0;
  const second = remainingTime % 60;
  const min = Math.floor((remainingTime % 3600) / 60);
  const hour = Math.floor(remainingTime / 3600);
  return `${hour}h : ${min}m : ${second}s`;
};
