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

export default function Main() {
  const { step } = useBookingInfo();

  return (
    <Card className="w-full py-5 min-h-[calc(100vh-40px)] relative">
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
      <div className="px-4 lg:absolute bottom-4 pt-6">
        {step !== 6 && (
          <p className="text-sm text-muted-foreground">
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
