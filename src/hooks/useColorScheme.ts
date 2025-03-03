import { getColorScheme } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";

export function useColorScheme() {
  const { data: colorScheme, isLoading: isLoadingColorScheme } =
    useQuery<string>({
      queryKey: ["colorscheme"],
      queryFn: getColorScheme,
    });

  return { colorScheme, isLoadingColorScheme };
}
