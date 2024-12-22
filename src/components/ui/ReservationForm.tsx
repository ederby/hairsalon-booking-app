import useBookingInfo from "@/hooks/useBookingInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BookingInformation from "./BookingInformation";
import { Button } from "./button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { Input } from "./input";
import { ResponsiveDialog } from "./ResponsiveDialog";
import { Textarea } from "./textarea";

const formSchema = z.object({
  name: z.string(),
  phone: z
    .string()
    .regex(
      /^(?:\+46|0)[\s]?7[\s]?[0-9]{2}[\s]?[0-9]{3}[\s]?[0-9]{3}$/,
      "Ogiltigt nummer"
    ),
  email: z.string().email(),
  observations: z.string(),
});

export default function ReservationForm() {
  const { setGuestInfo, guestInfo } = useBookingInfo();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: guestInfo ? guestInfo.name : "",
      phone: guestInfo ? guestInfo.phone : "",
      email: guestInfo ? guestInfo.email : "",
      observations: guestInfo?.observations ? guestInfo.observations : "",
    },
    mode: "onChange",
  });
  const { isValid, isLoading } = form.formState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    setGuestInfo(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Namn..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Telefonnummer..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="E-post..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="observations"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="focus-visible:ring-teal-600"
                  placeholder="Tilläggsinformation..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ResponsiveDialog
          title="Din bokning"
          description="Här kan du inspektera och genomföra din bokning"
          trigger={
            <Button className="w-full" disabled={!isValid} type="submit">
              {isLoading ? "Laddar..." : "Fortsätt"}
            </Button>
          }
        >
          <BookingInformation />
        </ResponsiveDialog>
      </form>
    </Form>
  );
}
