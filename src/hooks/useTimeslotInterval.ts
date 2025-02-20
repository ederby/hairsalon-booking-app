import { getTimeslotInterval } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";

export function useTimeslotInterval() {
  const { data: timeslotInterval, isLoading: isLoadingTimeslotInterval } =
    useQuery<number>({
      queryKey: ["timeslotinterval"],
      queryFn: getTimeslotInterval,
    });

  return { timeslotInterval, isLoadingTimeslotInterval };
}
