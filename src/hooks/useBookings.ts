import { BookingType } from "@/data/types";
import { getBookings } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";

export function useBookings() {
  const { data: bookings, isLoading: isLoadingBookings } = useQuery<
    BookingType[]
  >({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { bookings, isLoadingBookings };
}
