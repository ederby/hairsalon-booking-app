import { format } from "date-fns";
import TimeSlot from "./TimeSlot";

type BookingTimeProps = {
  selectedDate: Date | undefined;
  schedule: Record<string, string[]>;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
};

export default function BookingTime({
  selectedDate,
  schedule,
  selectedTime,
  setSelectedTime,
}: BookingTimeProps): JSX.Element {
  if (!selectedDate) {
    return <p>Vänligen välj ett datum.</p>;
  }

  // Format selectedDate to match the keys in the schedule
  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const availableSlots = schedule[formattedDate] || [];

  return (
    <div>
      {availableSlots.length > 0 ? (
        <ul className="flex justify-start flex-wrap gap-4">
          {availableSlots.map((slot) => (
            <TimeSlot
              key={slot}
              slot={slot}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          ))}
        </ul>
      ) : (
        <p className="text-center">Inga tillgängliga tider för detta datum.</p>
      )}
    </div>
  );
}
