import useBookingInfo from "@/hooks/useBookingInfo";
import StepMap from "./StepMap";
import { InspectBooking } from "./InspectBooking";

export default function Header(): JSX.Element {
  const { step, category } = useBookingInfo();

  return (
    <header>
      <div className="flex justify-between  px-5 mb-3">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {step === 0 && <span>Välj kategori</span>}
          {step === 1 && <span>Välj tjänst</span>}
          {step === 2 && <span>Välj tilläggstjänster</span>}
          {step === 3 && <span>Välj person</span>}
          {step === 4 && <span>Välj tid</span>}
          {step === 5 && <span>Boka tid</span>}
        </h3>
        {!!category && step !== 6 && <InspectBooking />}
      </div>
      {step !== 6 && <StepMap />}
    </header>
  );
}
