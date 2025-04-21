export const setArrivalTime = (timeStr: string, secondsToAdd: number) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const totalSeconds = hours * 3600 + minutes * 60 + secondsToAdd;

  const newHours = Math.floor(totalSeconds / 3600);
  const newMinutes = Math.floor((totalSeconds % 3600) / 60);

  return `${String(newHours).padStart(2, "0")}.${String(newMinutes).padStart(
    2,
    "0"
  )}`;
};
