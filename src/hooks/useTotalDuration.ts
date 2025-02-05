import useBookingInfo from "./useBookingInfo";

export function useTotalDuration() {
  const { extraService, service } = useBookingInfo();

  const extraServiceDuration = extraService.length
    ? extraService.reduce((tot, service) => tot + service.duration, 0)
    : 0;

  const totalDuration: number = (service?.duration ?? 0) + extraServiceDuration;

  return totalDuration;
}
