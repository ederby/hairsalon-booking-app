import { ExtraServiceType } from "@/data/types";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import useBookingInfo from "@/hooks/useBookingInfo";
import { useEffect, useState } from "react";

type Service = {
  extraService: ExtraServiceType;
  handleExtraServices: (extraService: ExtraServiceType) => void;
};

export default function ExtraServiceItem({
  extraService,
  handleExtraServices,
}: Service): JSX.Element {
  const { title, id } = extraService;
  const { extraService: extraServices } = useBookingInfo();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    if (extraServices)
      setIsChecked(() => extraServices.some((exSer) => exSer.id === id));
  }, [extraServices, id]);

  function handleChecked() {
    handleExtraServices(extraService);
    setIsChecked((c: boolean) => !c);
  }

  return (
    <TableRow
      onClick={handleChecked}
      className={`hover:bg-teal-50 cursor-pointer ${
        isChecked ? "bg-teal-100" : null
      }`}
    >
      <TableCell className="font-medium flex items-center gap-1">
        <Checkbox
          className="rounded-sm border-teal-800 data-[state=checked]:bg-teal-600 data-[state=checked]:border-opacity-0"
          checked={isChecked}
        />{" "}
        <span className={`${isChecked ? "text-teal-800" : ""}`}>{title}</span>
      </TableCell>
    </TableRow>
  );
}
