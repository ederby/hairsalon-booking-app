import useBookingInfo from "@/hooks/useBookingInfo";
import { getStaffForCategory } from "@/services/apiServices";

import { StaffType } from "@/data/types";
import { useQuery } from "@tanstack/react-query";
import ListBody from "./ListBody";
import ListItem from "./ListItem";
import Spinner from "./Spinner";

export default function Personel(): JSX.Element {
  const { category, setStaff } = useBookingInfo();
  const {
    data: staff,
    isPending,
    error,
  } = useQuery<StaffType[]>({
    queryKey: ["staff", category?.id],
    queryFn: () => getStaffForCategory(category!.id),
    enabled: !!category?.id,
  });
  const activeStaff = staff?.filter((person) => person.isActive);

  if (error) {
    console.error(error);
    return (
      <div>
        <p>Something went wrong while fetching staff.</p>
        <pre>{error?.message}</pre>
      </div>
    );
  }

  if (isPending) return <Spinner />;

  return (
    <div className="flex gap-5 flex-wrap w-full">
      <ListBody>
        {activeStaff?.map((person: StaffType) => {
          return (
            <ListItem
              handleClick={() => setStaff(person)}
              title={person.name}
              id={person.id}
              image={person.image}
              key={person.id}
              description={person.role}
            />
          );
        })}
      </ListBody>
    </div>
  );
}
