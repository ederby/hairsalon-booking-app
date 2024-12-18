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

  if (isPending) return <Spinner />;
  if (error) return <div>Nu blev det fel.</div>;

  if (!services) {
    return (
      <div className="px-5">
        Det finns inga tjänster under denna kategorien just nu,{" "}
        <span
          onClick={() => setStep(0)}
          className="underline text-teal-600 cursor-pointer hover:text-teal-400"
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
        {services.map((service) => (
          <ServiceItem service={service} key={service.id} />
        ))}
      </TableBody>
    </Table>
  );
}
