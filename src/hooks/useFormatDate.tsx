import { format } from "date-fns";
import { sv } from "date-fns/locale";

type useFormatDateProps = Date | string | undefined;

export default function useFormatDate(selectedDate: useFormatDateProps) {
  const selectedDateAsDate =
    typeof selectedDate === "string" || typeof selectedDate === "number"
      ? new Date(selectedDate)
      : selectedDate;
  const formattedDate = selectedDateAsDate
    ? format(selectedDateAsDate, "EEE do MMM yyyy", { locale: sv })
    : "";
  const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  return capitalizedDate;
}
