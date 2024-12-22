import BookingDetails from "./BookingDetails";
import useBookingInfo from "@/hooks/useBookingInfo";
import { useMutation } from "@tanstack/react-query";
import { makeGuestReservation } from "@/services/apiServices";
import Spinner from "./Spinner";

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
    const booking = {
      category,
      service,
      extraServices: extraService,
      staff_id: person?.id,
      selectedDate,
      selectedTime,
      guestInfo,
    };

    mutate(booking);
  }

  if (isPending) return <Spinner />;

  return <BookingDetails makeReservation={makeReservation} />;
}
