import { createContext, useContext } from "react";
import {
  CategoryType,
  ExtraServiceType,
  GuestInfo,
  ServiceType,
  StaffType,
} from "@/data/types";

export type StateType = {
  step: number;
  category: CategoryType | null;
  service: ServiceType | null;
  extraService: ExtraServiceType[];
  person: StaffType | null;
  selectedDate: Date | string;
  selectedTime: string;
  guestInfo: GuestInfo;
};

type BookingInfoContextValue = StateType & {
  setCategory: (category: CategoryType) => void;
  setService: (service: ServiceType) => void;
  setExtraService: (extraService: ExtraServiceType[]) => void;
  setStaff: (person: StaffType) => void;
  setStep: (step: number) => void;
  setBooking: (
    selectedDate: Date | string,
    selectedTime: string,
    staff: StaffType | null | undefined
  ) => void;
  setGuestInfo: (guest: GuestInfo) => void;
};

export const BookingInfoContext = createContext<
  BookingInfoContextValue | undefined
>(undefined);

export default function useBookingInfo() {
  const context = useContext(BookingInfoContext);
  if (context === undefined) {
    throw new Error(
      "The BookingInfoContext is being used outside of the BookingInfoProvider."
    );
  }
  return context;
}
