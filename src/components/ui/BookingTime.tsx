import { StaffType, WorkdaysType } from "@/data/types";
import { useBookings } from "@/hooks/useBookings";
import { useTotalDuration } from "@/hooks/useTotalDuration";
import { addMinutes, format, isBefore, parse, startOfDay } from "date-fns";
import TimeSlot from "./TimeSlot";

type BookingTimeProps = {
  selectedDate: Date | undefined;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  person: StaffType | null;
  currentWorkingday: WorkdaysType | undefined;
  availableStaff: StaffType[] | undefined;
};

export default function BookingTime({
  selectedDate,
  selectedTime,
  setSelectedTime,
  person,
  currentWorkingday,
  availableStaff,
}: BookingTimeProps): JSX.Element {
  const { bookings } = useBookings();
  const totalDuration = useTotalDuration();

  const filteredBookings = bookings?.filter((booking) => {
    const isNotCanceled = !booking.canceled;
    const isStaffMatch =
      person?.id === -1
        ? availableStaff?.some((staff) => staff.id === booking.staff_id)
        : booking.staff_id === person?.id;
    const isFutureBooking =
      startOfDay(new Date(booking.selectedDate)) >= startOfDay(new Date());
    const isSameDay =
      format(booking.selectedDate, "yy-MM-dd") ===
      format(new Date(selectedDate ?? ""), "yy-MM-dd");

    return isNotCanceled && isStaffMatch && isFutureBooking && isSameDay;
  });

  if (!selectedDate) {
    return <p>Vänligen välj ett datum.</p>;
  }
  if (!currentWorkingday) {
    return <p>Ingen arbetsdag vald.</p>;
  }

  // Function to generate time slots
  const generateTimeSlots = (
    startTime: string,
    endTime: string,
    interval: number,
    duration: number
  ) => {
    const slots = [];
    let current = parse(startTime, "HH:mm", new Date());
    const end = parse(endTime, "HH:mm", new Date());

    while (isBefore(current, end)) {
      const slotEndTime = addMinutes(current, duration);
      if (isBefore(slotEndTime, end)) {
        slots.push(format(current, "HH:mm"));
      }
      current = addMinutes(current, interval);
    }

    return slots;
  };

  // Function to check for collisions
  const hasCollision = (slot: string) => {
    return availableStaff?.every((staff) =>
      filteredBookings?.some((booking) => {
        if (booking.staff_id !== staff.id) return false;
        const bookingStart = parse(booking.startTime, "HH:mm", new Date());
        const bookingEnd = parse(booking.endTime, "HH:mm", new Date());
        const slotTime = parse(slot, "HH:mm", new Date());
        const slotEndTime = addMinutes(slotTime, totalDuration);

        return (
          isBefore(slotTime, bookingEnd) && isBefore(bookingStart, slotEndTime)
        );
      })
    );
  };

  // Generate all possible time slots
  const allSlots = generateTimeSlots(
    currentWorkingday.startTime,
    currentWorkingday.endTime,
    15,
    totalDuration
  );

  // Filter out the slots that collide with filteredBookings
  const availableSlots = allSlots.filter((slot) => !hasCollision(slot));

  return (
    <div>
      {availableSlots.length > 0 ? (
        <ul className="flex justify-start flex-wrap gap-2">
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
