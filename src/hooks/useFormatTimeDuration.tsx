import { parse, addMinutes, format } from "date-fns";

export default function useFormatTimeDuration(
  selectedTime: string,
  duration: number
): string {
  if (!selectedTime) return "Ej vald";
  // Parse the starting time (assumes it is in HH:mm format)
  const startTime = parse(selectedTime, "HH:mm", new Date());

  // Add the duration to the starting time
  const endTime = addMinutes(startTime, duration);

  // Format the times back to HH:mm format
  const formattedStartTime = format(startTime, "HH:mm");
  const formattedEndTime = format(endTime, "HH:mm");

  // Combine into a single string
  return `${formattedStartTime}-${formattedEndTime}`;
}
