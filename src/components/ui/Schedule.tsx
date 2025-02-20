import { StaffType } from "@/data/types";
import useBookingInfo from "@/hooks/useBookingInfo";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import BookingTime from "./BookingTime";
import CalendarTime from "./CalendarTime";
import { Button } from "./button";
import { addMinutes, format, isBefore, parse } from "date-fns";
import { CircleUserRound } from "lucide-react";
import { useBookings } from "@/hooks/useBookings";
import Spinner from "./Spinner";
import { useWorkdays } from "@/hooks/useWorkdays";
import { useTotalDuration } from "@/hooks/useTotalDuration";

export default function Schedule(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { person, setBooking, category } = useBookingInfo();
  const { isLoadingBookings } = useBookings();
  const { workdays, isLoadingWorkdays } = useWorkdays();
  const totalDuration = useTotalDuration();

  const queryClient = useQueryClient();
  const staffList = queryClient.getQueryData<StaffType[]>([
    "staff",
    category!.id,
  ]);

  const availableStaff = staffList?.filter((staff) =>
    workdays?.some(
      (workday) =>
        workday.staffID === staff.id &&
        workday.date === format(new Date(selectedDate ?? ""), "yyyy-MM-dd")
    )
  );

  const availableWorkdays = workdays?.filter((workday) =>
    staffList?.some((staff) => staff.id === workday.staffID)
  );

  const activeSchedule =
    person?.id === -1
      ? Array.from(new Set(availableWorkdays?.map((workday) => workday.date)))
      : availableWorkdays
          ?.filter((workday) => workday.staffID === person?.id)
          .map((workday) => workday.date);

  const currentWorkingday =
    person?.id === -1
      ? {
          id: -1,
          staffID: -1,
          date: format(new Date(selectedDate ?? ""), "yyyy-MM-dd"),
          startTime:
            availableWorkdays
              ?.filter(
                (workday) =>
                  workday.date ===
                  format(new Date(selectedDate ?? ""), "yyyy-MM-dd")
              )
              .reduce(
                (earliest, workday) =>
                  earliest < workday.startTime ? earliest : workday.startTime,
                "23:59"
              ) ?? "00:00",
          endTime:
            availableWorkdays
              ?.filter(
                (workday) =>
                  workday.date ===
                  format(new Date(selectedDate ?? ""), "yyyy-MM-dd")
              )
              .reduce(
                (latest, workday) =>
                  latest > workday.endTime ? latest : workday.endTime,
                "00:00"
              ) ?? "23:59",
        }
      : availableWorkdays?.find(
          (workday) =>
            workday.date ===
              format(new Date(selectedDate ?? ""), "yyyy-MM-dd") &&
            workday.staffID === person?.id
        );

  if (!person) {
    return <div>Personen hittades inte.</div>;
  }

  function handleClick() {
    if (selectedDate && selectedTime) {
      let randomStaff: StaffType | null | undefined = null;

      if (person?.id === -1) {
        if (availableStaff && availableStaff.length > 0) {
          const availableStaffDuringSelectedTime = availableStaff.filter(
            (staff) => {
              const workday = availableWorkdays?.find(
                (workday) =>
                  workday.staffID === staff.id &&
                  workday.date ===
                    format(new Date(selectedDate ?? ""), "yyyy-MM-dd")
              );

              if (!workday) return false;

              const selectedStartTime = parse(
                selectedTime,
                "HH:mm",
                new Date()
              );
              const selectedEndTime = addMinutes(
                selectedStartTime,
                totalDuration
              );

              const workdayStartTime = parse(
                workday.startTime,
                "HH:mm",
                new Date()
              );
              const workdayEndTime = parse(
                workday.endTime,
                "HH:mm",
                new Date()
              );

              return (
                isBefore(selectedStartTime, workdayEndTime) &&
                isBefore(workdayStartTime, selectedEndTime)
              );
            }
          );

          if (availableStaffDuringSelectedTime.length > 0) {
            const random = Math.floor(
              Math.random() * availableStaffDuringSelectedTime.length
            );
            randomStaff = availableStaffDuringSelectedTime[random];
          }
        }
      }

      setBooking(selectedDate, selectedTime, randomStaff);
    } else {
      console.error("Selected date or time is missing");
    }
  }

  if (isLoadingBookings || isLoadingWorkdays) return <Spinner />;

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
          schedule={activeSchedule ?? []}
        />
      </div>
      <div className="">
        <BookingTime
          person={person}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          currentWorkingday={currentWorkingday}
          availableStaff={availableStaff}
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
