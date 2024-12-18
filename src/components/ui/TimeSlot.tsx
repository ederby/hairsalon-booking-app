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
      <button
        className={`px-4 py-4 rounded w-full min-w-[100px] ${
          selectedTime === slot
            ? "bg-amber-400 text-amber-900"
            : "bg-amber-200 text-amber-900"
        }`}
        onClick={() => setSelectedTime(slot)}
      >
        {slot}
      </button>
    </li>
  );
}
