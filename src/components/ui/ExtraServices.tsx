import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExtraServiceType } from "@/data/types";
import useBookingInfo from "@/hooks/useBookingInfo";
import { useEffect, useState } from "react";
import ExtraServiceItem from "./ExtraServiceItem";
import { Button } from "./button";
import { getExtraServices } from "@/services/apiServices";
import Spinner from "./Spinner";
import { useQuery } from "@tanstack/react-query";

type ServicesState = ExtraServiceType[];

export default function Category(): JSX.Element {
  const { extraService: exServ } = useBookingInfo();
  const [exSer, setExSer] = useState<ServicesState>(exServ ?? []);
  const { category, setExtraService, setStep } = useBookingInfo();
  const {
    data: extraServices,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["extraService", category?.id],
    queryFn: () => getExtraServices(category!.id),
  });

  useEffect(() => {
    if (extraServices && extraServices.length === 0) {
      setStep(3);
    }
  }, [extraServices, setStep]);

  if (error) {
    console.error(error);
    return (
      <div>
        <p>Something went wrong while fetching extra services.</p>
        <pre>{error?.message}</pre>
      </div>
    );
  }

  if (isLoading) return <Spinner />;

  function handleExtraServices(extraService: ExtraServiceType): void {
    setExSer((services: ServicesState) => {
      if (services.some((ser) => ser.id === extraService.id))
        return services.filter((ser) => ser.id !== extraService.id);
      return [...services, extraService];
    });
  }
  function handleSetExtraService(): void {
    setExtraService(exSer);
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full text-zinc-500">Tjänster</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {extraServices?.map((extraService: ExtraServiceType) => (
            <ExtraServiceItem
              extraService={extraService}
              handleExtraServices={handleExtraServices}
              key={extraService.id}
            />
          ))}
        </TableBody>
      </Table>
      <div className="px-4">
        <Button onClick={handleSetExtraService} className="w-full mt-4">
          {exSer ? "Fortsätt" : "Fortsätt utan tilläggstjänst"}
        </Button>
      </div>
    </div>
  );
}
