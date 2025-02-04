import { WorkdaysType } from "@/data/types";
import { getWorkdays } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";

export function useWorkdays() {
  const { data: workdays, isLoading: isLoadingWorkdays } = useQuery<
    WorkdaysType[]
  >({
    queryKey: ["workdays"],
    queryFn: getWorkdays,
  });

  return { workdays, isLoadingWorkdays };
}
