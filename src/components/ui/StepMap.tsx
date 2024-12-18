import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useBookingInfo from "@/hooks/useBookingInfo";
import { useQuery } from "@tanstack/react-query";
import { getExtraServices } from "@/services/apiServices";

export default function StepMap() {
  const { step, setStep, category } = useBookingInfo();
  const { data: extraServices } = useQuery({
    queryKey: ["extraService", category?.id],
    queryFn: () => getExtraServices(category!.id),
  });

  return (
    <div className="bg-zinc-100 py-3 px-5 uppercase">
      <Breadcrumb>
        <BreadcrumbList>
          {step >= 0 && (
            <BreadcrumbItem>
              <BreadcrumbLink
                className={`cursor-pointer text-zinc-400 hover:text-zinc-700 ${
                  step === 0 ? "text-zinc-700" : "cursor-pointer"
                }`}
                onClick={() => setStep(0)}
              >
                Kategori
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}

          {step >= 1 && (
            <>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink
                  className={`cursor-pointer text-zinc-400 hover:text-zinc-700 ${
                    step === 1 ? "text-zinc-700" : "cursor-pointer"
                  }`}
                  onClick={() => setStep(1)}
                >
                  Tjänst
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}

          {step >= 2 && extraServices!.length > 0 && (
            <>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink
                  className={`cursor-pointer text-zinc-400 hover:text-zinc-700 ${
                    step === 2 ? "text-zinc-700" : "cursor-pointer"
                  }`}
                  onClick={() => setStep(2)}
                >
                  Tilläggstjänster
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}

          {step >= 3 && (
            <>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink
                  className={`cursor-pointer text-zinc-400 hover:text-zinc-700 ${
                    step === 3 ? "text-zinc-700" : "cursor-pointer"
                  }`}
                  onClick={() => setStep(3)}
                >
                  Person
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {step >= 4 && (
            <>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage
                  className={`cursor-pointer text-zinc-400 hover:text-zinc-700 ${
                    step === 4 ? "text-zinc-700" : "cursor-pointer"
                  }`}
                  onClick={() => setStep(4)}
                >
                  Tid
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
          {step >= 5 && (
            <>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage
                  className={`cursor-pointer text-zinc-400 hover:text-zinc-700 ${
                    step === 5 ? "text-zinc-700" : "cursor-pointer"
                  }`}
                >
                  Boka tid
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
