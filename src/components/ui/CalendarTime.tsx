import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { sv } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import useFormatDate from "@/hooks/useFormatDate";
import { startOfDay } from "date-fns";

type CalendarTimeProps = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  schedule: string[];
};

export default function CalendarTime({
  selectedDate,
  setSelectedDate,
  schedule,
}: CalendarTimeProps): JSX.Element {
  const availableDates = schedule?.map((date) => new Date(date));
  const formatedDate = useFormatDate(selectedDate);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "text-left font-normal w-full text-[var(--primary-700)] border-[var(--primary-500)] hover:bg-[var(--primary-100)] hover:border-opacity-0",
            !formatedDate && "text-muted-foreground justify-center"
          )}
        >
          <CalendarIcon />
          {formatedDate ? formatedDate.toString() : <span>Välj datum</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          weekStartsOn={1}
          locale={sv}
          modifiers={{
            available: (date) =>
              availableDates.some(
                (availableDate) =>
                  date.toISOString().split("T")[0] ===
                  availableDate.toISOString().split("T").at(0)
              ),
          }}
          disabled={(date) =>
            startOfDay(date) < startOfDay(new Date()) ||
            !availableDates.some(
              (availableDate) =>
                availableDate.toDateString() === date.toDateString()
            )
          }
        />
      </PopoverContent>
    </Popover>
  );
}
