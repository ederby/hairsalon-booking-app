import { Button } from "./button";

type TimeSlotProps = {
  slot: string;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
};

export default function TimeSlot({
  slot,
  selectedTime,
  setSelectedTime,
}: TimeSlotProps): JSX.Element {
  return (
    <li className="grow">
      <Button
        variant="outline"
        className={`px-4 py-4 rounded w-full min-w-[100px] ${
          selectedTime === slot
            ? "bg-teal-600 text-teal-50 border-teal-600 hover:bg-teal-600 hover:text-teal-50"
            : ""
        }`}
        onClick={() => setSelectedTime(slot)}
      >
        {slot}
      </Button>
    </li>
  );
}
