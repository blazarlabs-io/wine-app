export const dateToTimestamp = (): number => {
  let currentDate = new Date();
  let timestamp = currentDate.getTime();
  return timestamp;
};
