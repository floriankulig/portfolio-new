export const formatTimeForGermany = (date: Date) => {
  return date.toLocaleTimeString("de-DE", {
    timeZone: "Europe/Berlin",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
};
