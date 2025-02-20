import { BookingSettingsType } from "@/data/types";
import { getBookingSettings } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";

export function useBookingSettings() {
  const { data: bookingSettings, isLoading: isLoadingBookingSettings } =
    useQuery<BookingSettingsType>({
      queryKey: ["bookingsettings"],
      queryFn: getBookingSettings,
    });

  return { bookingSettings, isLoadingBookingSettings };
}
