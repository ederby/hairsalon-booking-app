import useBookingInfo from "@/hooks/useBookingInfo";
import { Card } from "./card";

import Category from "./Category";
import ExtraServices from "./ExtraServices";
import Header from "./Header";
import Personel from "./Personel";
import Reservation from "./Reservation";
import Schedule from "./Schedule";
import Services from "./Services";
import BookingSuccess from "./BookingSuccess";
import { Separator } from "./separator";

export default function Main() {
  const { step } = useBookingInfo();

  return (
    <Card className="w-full py-5 min-h-[calc(100vh-40px)] flex flex-col">
      <Header />
      <div className="h-full block">
        {step === 0 && <Category />}
        {step === 1 && <Services />}
        {step === 2 && <ExtraServices />}
        {step === 3 && <Personel />}
        {step === 4 && <Schedule />}
        {step === 5 && <Reservation />}
        {step === 6 && <BookingSuccess />}
      </div>
      <div className="pt-4 flex-1 flex flex-col items-end justify-end">
        <Separator className="mt-4" />
        {step !== 6 && (
          <p className="text-sm text-muted-foreground px-4 pt-4">
            Avbokningen måste ske senast 24h före reserverad tid. Uteblivna
            kundbesök som inte avbokats inom 24h debiteras med 50% av den totala
            kostnaden på bokad behandling. Röda dagar, helger samt stängda
            tisdagar räknas ej i de 24h.
          </p>
        )}
      </div>
    </Card>
  );
}
