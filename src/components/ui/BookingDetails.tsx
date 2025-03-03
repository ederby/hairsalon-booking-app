import useBookingInfo from "@/hooks/useBookingInfo";
import useFormatDate from "@/hooks/useFormatDate";
import useFormatTimeDuration from "@/hooks/useFormatTimeDuration";
import { Button } from "./button";
import { useTotalDuration } from "@/hooks/useTotalDuration";

type BookingDetailsProps = {
  makeReservation: () => void;
};

export default function BookingDetails({
  makeReservation,
}: BookingDetailsProps): JSX.Element {
  const {
    category,
    service,
    extraService,
    person,
    selectedDate,
    selectedTime,
    step,
    guestInfo,
  } = useBookingInfo();

  const formattedDate = useFormatDate(selectedDate);
  const totalDuration = useTotalDuration();
  const formattedTime = useFormatTimeDuration(selectedTime, totalDuration);

  const extraServiceTotalPrice = extraService.length
    ? extraService.reduce((tot, service) => tot + service.price, 0)
    : 0;
  const totalPrice = (service?.price ?? 0) + extraServiceTotalPrice;
  return (
    <div className="w-full flex flex-col md:gap-16">
      <div>
        <div
          className={`flex w-full justify-between border-t border-zinc-200 py-3 px-4 ${
            category && "bg-[var(--primary-50)]"
          }`}
        >
          <span className="text-zinc-400">Kategori</span>
          <span className={`${category ? "text-[var(--primary-600)]" : ""}`}>
            {category ? category.title : "Ej vald"}
          </span>
        </div>

        <div
          className={`flex w-full justify-between border-t border-zinc-200 py-3 px-4 ${
            service && "bg-[var(--primary-50)]"
          }`}
        >
          <span className="text-zinc-400">Tjänst</span>
          <span className={`${service ? "text-[var(--primary-600)]" : ""}`}>
            {service ? service.title : "Ej vald"}
          </span>
        </div>

        {extraService && (
          <div
            className={`flex w-full justify-between border-t border-zinc-200 py-3 px-4 ${
              extraService.length || step > 2 ? "bg-[var(--primary-50)]" : ""
            }`}
          >
            <span className="text-zinc-400">Tilläggstjänster</span>
            <span
              className={`${
                extraService.length || step > 2
                  ? "text-[var(--primary-600)]"
                  : ""
              }`}
            >
              {extraService.length
                ? extraService.map((exSer) => (
                    <span key={exSer.id} className="block text-right">
                      {exSer.title}
                    </span>
                  ))
                : step > 2
                ? "Ingen tilläggstjänst"
                : "Ej vald"}
            </span>
          </div>
        )}

        <div
          className={`flex w-full justify-between border-t border-zinc-200 py-3 px-4 ${
            person && "bg-[var(--primary-50)]"
          }`}
        >
          <span className="text-zinc-400">Personal</span>
          <span className={`${person ? "text-[var(--primary-600)]" : ""}`}>
            {person ? person.name : "Ej vald"}
          </span>
        </div>

        <div
          className={`flex w-full justify-between border-t border-zinc-200 py-3 px-4 ${
            formattedDate && step > 4 && "bg-[var(--primary-50)]"
          }`}
        >
          <span className="text-zinc-400">Datum</span>
          <span
            className={`${
              formattedDate && step > 4 ? "text-[var(--primary-600)]" : ""
            }`}
          >
            {formattedDate && step > 4 ? formattedDate : "Ej vald"}
          </span>
        </div>

        <div
          className={`flex w-full justify-between border-t border-zinc-200 py-3 px-4 ${
            selectedTime && "bg-[var(--primary-50)]"
          }`}
        >
          <span className="text-zinc-400">Tid</span>
          <span
            className={`${selectedTime ? "text-[var(--primary-600)]" : ""}`}
          >
            {selectedTime ? `Kl.${formattedTime}` : "Ej vald"}
          </span>
        </div>

        <div
          className={`flex w-full justify-between border-t border-zinc-200 py-3 px-4 ${
            guestInfo ? "bg-[var(--primary-50)]" : ""
          }`}
        >
          <span className="text-zinc-400">Dina uppgifter</span>
          <span className={`${guestInfo ? "text-[var(--primary-600)]" : ""}`}>
            {guestInfo ? (
              <>
                <span className="block text-right">{guestInfo.name}</span>
                <span className="block text-right">{guestInfo.phone}</span>
                <span className="block text-right">{guestInfo.email}</span>
                {guestInfo.observations && (
                  <span className="block text-right">
                    {guestInfo.observations}
                  </span>
                )}
              </>
            ) : (
              "Ej vald"
            )}
          </span>
        </div>
      </div>

      <div className="flex w-full border-t border-zinc-200 py-3 px-4 border-dashed flex-col gap-4">
        <div className="flex justify-between">
          <span className="font-bold">Totalkostnad</span>
          <span className="font-bold">{totalPrice}:-</span>
        </div>
        {!!guestInfo && (
          <Button onClick={makeReservation} className="w-full">
            Bekräfta bokning
          </Button>
        )}
      </div>
    </div>
  );
}
