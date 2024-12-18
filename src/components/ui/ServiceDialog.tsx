import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

type ServiceDialogProps = {
  title: string;
  description: string | undefined;
};

export default function ServiceDialog({
  title,
  description,
}: ServiceDialogProps): JSX.Element {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer text-teal-600">
          <Info strokeWidth={1.5} />
        </span>
      </DialogTrigger>
      <DialogContent className="bg-zinc-100 rounded-md border-none p-6">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
