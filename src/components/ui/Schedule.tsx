import { StaffType } from "@/data/types";
import useBookingInfo from "@/hooks/useBookingInfo";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import BookingTime from "./BookingTime";
import CalendarTime from "./CalendarTime";
import { Button } from "./button";
import { format } from "date-fns";
import { CircleUserRound } from "lucide-react";

export default function Schedule(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { person, setBooking, category } = useBookingInfo();

  const queryClient = useQueryClient();
  const staffList = queryClient.getQueryData<StaffType[]>([
    "staff",
    category!.id,
  ]);

  if (!person) {
    return <div>Personen hittades inte.</div>;
  }

  function mergeStaffSchedules(
    staffList: StaffType[]
  ): Record<string, string[]> {
    const combinedSchedule: Record<string, Set<string>> = {};

    staffList.forEach((staff) => {
      Object.entries(staff.schedule).forEach(([date, times]) => {
        if (!combinedSchedule[date]) {
          combinedSchedule[date] = new Set();
        }
        times.forEach((time) => combinedSchedule[date].add(time));
      });
    });

    return Object.fromEntries(
      Object.entries(combinedSchedule).map(([date, times]) => [
        date,
        Array.from(times).sort(), // Sort times for consistency
      ])
    );
  }

  const anyStaffSchedule = mergeStaffSchedules(staffList || []);
  const activeSchedule =
    person?.id === -1 ? anyStaffSchedule : person?.schedule;

  function handleClick() {
    if (selectedDate && selectedTime) {
      let randomStaff: StaffType | null | undefined = null;

      if (person?.id === -1) {
        const formattedDate = format(selectedDate, "yyyy-MM-dd");
        const staffMembers = staffList?.filter((staff) =>
          Object.keys(staff.schedule).find((date) => date === formattedDate)
        );
        const random = Math.floor(Math.random() * staffMembers!.length);
        randomStaff = staffMembers?.at(random);
      }

      setBooking(selectedDate, selectedTime, randomStaff);
    } else {
      console.error("Selected date or time is missing");
    }
  }

  return (
    <div className="px-4 flex flex-col justify-center">
      <div className="flex items-center gap-2 pt-4 justify-center">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-zinc-100">
          {person.id !== -1 ? (
            <img src={person.image} alt={person.name} />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircleUserRound size={35} strokeWidth={1} color="#a1a1aa" />
            </div>
          )}
        </div>
        <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
          {person.name}
        </h3>
      </div>
      <div className="my-5 w-full">
        <CalendarTime
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          schedule={activeSchedule}
        />
      </div>
      <div className="">
        <BookingTime
          selectedDate={selectedDate}
          schedule={activeSchedule}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>
      <div className="pt-4">
        {selectedDate && selectedTime && (
          <Button onClick={handleClick} className="w-full">
            Fortsätt
          </Button>
        )}
      </div>
    </div>
  );
}
