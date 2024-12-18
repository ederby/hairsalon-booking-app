import { Button } from "@/components/ui/button";
import BookingInformation from "./BookingInformation";
import { ResponsiveDialog } from "./ResponsiveDialog";

export function InspectBooking(): JSX.Element {
  return (
    <ResponsiveDialog
      title="Din bokning"
      description="Här kan du inspektera din bokning"
      trigger={<Button variant="outline">Din bokning</Button>}
    >
      <BookingInformation />
    </ResponsiveDialog>
  );
}
