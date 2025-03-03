import { TableCell, TableRow } from "@/components/ui/table";
import { ServiceType } from "@/data/types";
import useBookingInfo from "@/hooks/useBookingInfo";
import { Info } from "lucide-react";
import { ResponsiveDialog } from "./ResponsiveDialog";

type Service = {
  service: ServiceType;
};

export default function ServiceItem({ service }: Service): JSX.Element {
  const { description, title } = service;
  const { setService } = useBookingInfo();

  return (
    <TableRow className="hover:bg-[var(--primary-50)] cursor-pointer">
      <TableCell onClick={() => setService(service)} className="font-medium">
        {title}
      </TableCell>
      <TableCell>
        <ResponsiveDialog
          title={title}
          description={description}
          trigger={
            <span className="cursor-pointer text-[var(--primary-600)]">
              <Info strokeWidth={1.5} />
            </span>
          }
        />
      </TableCell>
    </TableRow>
  );
}
