import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useBookingInfo from "@/hooks/useBookingInfo";
import { getServices } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";
import ServiceItem from "./ServiceItem";
import Spinner from "./Spinner";

export default function Category(): JSX.Element {
  const { category } = useBookingInfo();
  const { setStep } = useBookingInfo();

  const {
    data: services,
    isPending,
    error,
  } = useQuery({
    queryKey: ["service", category!.id],
    queryFn: () => getServices(category!.id),
  });

  const filteredServices = services?.filter((service) => service.isActive);

  if (isPending) return <Spinner />;
  if (error) return <div>Nu blev det fel.</div>;

  if (!filteredServices) {
    return (
      <div className="px-5">
        Det finns inga tjänster under denna kategorien just nu,{" "}
        <span
          onClick={() => setStep(0)}
          className="underline text-[var(--primary-600)] cursor-pointer hover:text-[var(--primary-400)]"
        >
          gå tillbaka.
        </span>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-full text-zinc-500">Tjänster</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredServices.map((service) => (
          <ServiceItem service={service} key={service.id} />
        ))}
      </TableBody>
    </Table>
  );
}
