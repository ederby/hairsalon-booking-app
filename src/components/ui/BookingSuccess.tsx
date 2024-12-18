import useBookingInfo from "@/hooks/useBookingInfo";
import { Button } from "./button";
import { PartyPopper } from "lucide-react";

export default function BookingSuccess() {
  const { guestInfo, setStep } = useBookingInfo();

  return (
    <div className="px-4 w-full flex items-center flex-col gap-6 pt-[7vh]">
      <div>
        <PartyPopper size={200} strokeWidth={1} color="#0d9489" />
      </div>
      <div>
        <h2 className="scroll-m-20 pb-12 text-3xl font-semibold tracking-tight first:mt-0 text-center">
          Tack {guestInfo?.name} för din bokning. <br />
          Vi ser fram emot ditt besök.
        </h2>
        <Button onClick={() => setStep(0)} className="w-full">
          Gör en ny bokning
        </Button>
      </div>
    </div>
  );
}
