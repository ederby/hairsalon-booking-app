import BookingDetails from "./BookingDetails";
import useBookingInfo from "@/hooks/useBookingInfo";
import { useMutation } from "@tanstack/react-query";
import { makeGuestReservation } from "@/services/apiServices";
import Spinner from "./Spinner";
import { addMinutes, format, parse } from "date-fns";

export default function BookingInformation(): JSX.Element {
  const {
    category,
    service,
    extraService,
    person,
    selectedDate,
    selectedTime,
    guestInfo,
    setStep,
  } = useBookingInfo();

  const { mutate, isPending } = useMutation({
    mutationFn: makeGuestReservation,
    onSuccess: () => {
      setStep(6);
    },
  });

  function makeReservation() {
    const duration =
      (service?.duration || 0) +
      extraService.reduce((acc, curr) => acc + curr.duration, 0);
    const initialDate = parse(selectedTime, "HH:mm", new Date());
    const newDate = addMinutes(initialDate, duration);
    const endTime = format(newDate, "HH:mm");

    const booking = {
      category,
      service,
      extraServices: extraService,
      staff_id: person?.id,
      selectedDate,
      startTime: selectedTime,
      endTime,
      duration,
      guestInfo,
    };

    mutate(booking);
  }

  if (isPending) return <Spinner />;

  return <BookingDetails makeReservation={makeReservation} />;
}
