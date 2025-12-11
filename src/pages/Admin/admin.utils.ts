export function convertUTCToTimeZone(utcString: string, targetTZ: string) {
  // Parse input as *UTC* explicitly
  const date = new Date(utcString);

  // Use target timezone for formatting
  const dtf = new Intl.DateTimeFormat("en-GB", {
    timeZone: targetTZ,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Break into parts
  const parts = dtf.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value;

  return `${get("day")} ${get("month")} ${get("hour")}:${get(
    "minute"
  )} ${get("dayPeriod")!.toUpperCase()}`;
}
