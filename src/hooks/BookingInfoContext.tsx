import {
  CategoryType,
  ExtraServiceType,
  GuestInfo,
  ServiceType,
  StaffType,
} from "@/data/types";
import { ReactNode, useReducer } from "react";
import { BookingInfoContext, StateType } from "./useBookingInfo";

type BookingInfoProviderProps = {
  children: ReactNode;
};

type ActionType =
  | { type: "SET_CATEGORY"; payload: CategoryType }
  | { type: "SET_SERVICE"; payload: { service: ServiceType; step: number } }
  | { type: "SET_EXTRASERVICE"; payload: ExtraServiceType[] }
  | { type: "SET_STAFF"; payload: StaffType }
  | { type: "SET_STEP"; payload: number }
  | {
      type: "SET_BOOKING";
      payload: {
        selectedTime: string;
        selectedDate: Date | string;
        staff: StaffType | null | undefined;
      };
    }
  | { type: "SET_GUESTINFO"; payload: GuestInfo };

const initialState: StateType = {
  step: 0,
  category: null,
  service: null,
  extraService: [],
  person: null,
  selectedDate: new Date(),
  selectedTime: "",
  guestInfo: null,
};

function resetStateToStep(state: StateType, step: number): StateType {
  const resetState: StateType = {
    ...initialState,
    step,
    guestInfo: state.guestInfo,
  };
  if (step >= 1) resetState.category = state.category;
  if (step >= 2) resetState.service = state.service;
  if (step >= 3) resetState.extraService = state.extraService;
  if (step >= 4) resetState.person = state.person;
  return resetState;
}

function normalizeDate(date: Date | string): Date {
  return typeof date === "string" ? new Date(date) : date;
}

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SET_CATEGORY":
      return {
        ...initialState,
        step: 1,
        category: action.payload,
      };
    case "SET_SERVICE":
      return {
        ...state,
        service: action.payload.service,
        step: action.payload.step,
      };
    case "SET_EXTRASERVICE":
      return {
        ...state,
        extraService: action.payload,
        step: 3,
      };
    case "SET_STAFF":
      return { ...state, person: action.payload, step: 4 };
    case "SET_BOOKING":
      return {
        ...state,
        step: 5,
        selectedDate: normalizeDate(action.payload.selectedDate),
        selectedTime: action.payload.selectedTime,
        person: action.payload.staff ? action.payload.staff : state.person,
      };
    case "SET_GUESTINFO":
      return { ...state, guestInfo: action.payload };
    case "SET_STEP":
      if (action.payload === 0)
        return { ...initialState, guestInfo: state.guestInfo };
      return resetStateToStep(state, action.payload);
    default:
      return state;
  }
}

export default function BookingInfoProvider({
  children,
}: BookingInfoProviderProps): JSX.Element {
  const [
    {
      category,
      step,
      service,
      extraService,
      person,
      selectedDate,
      selectedTime,
      guestInfo,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  function setCategory(category: CategoryType) {
    dispatch({ type: "SET_CATEGORY", payload: category });
  }
  function setService(service: ServiceType) {
    if (!category)
      throw new Error("Category must be set before setting a service");

    dispatch({ type: "SET_SERVICE", payload: { service: service, step: 2 } });
  }
  function setExtraService(extraServices: ExtraServiceType[]) {
    dispatch({ type: "SET_EXTRASERVICE", payload: extraServices });
  }
  function setStaff(person: StaffType) {
    dispatch({ type: "SET_STAFF", payload: person });
  }
  function setStep(step: number) {
    dispatch({ type: "SET_STEP", payload: step });
  }
  function setBooking(
    selectedDate: Date | string,
    selectedTime: string,
    staff: StaffType | null | undefined
  ) {
    dispatch({
      type: "SET_BOOKING",
      payload: { selectedDate, selectedTime, staff },
    });
  }
  function setGuestInfo(guest: GuestInfo) {
    dispatch({ type: "SET_GUESTINFO", payload: guest });
  }

  return (
    <BookingInfoContext.Provider
      value={{
        category,
        step,
        service,
        extraService,
        person,
        selectedDate,
        selectedTime,
        guestInfo,
        setCategory,
        setService,
        setExtraService,
        setStaff,
        setStep,
        setBooking,
        setGuestInfo,
      }}
    >
      {children}
    </BookingInfoContext.Provider>
  );
}
