import useBookingInfo from "@/hooks/useBookingInfo";
import ListBody from "./ListBody";
import ListItem from "./ListItem";
import { getCategories } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";

export default function Category(): JSX.Element {
  const { setCategory } = useBookingInfo();

  const {
    isPending,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
  });

  if (isPending) return <Spinner />;
  if (error) return <div>Error</div>;

  return (
    <div className="flex gap-5 flex-wrap">
      <ListBody>
        {categories.map((category) => (
          <ListItem
            handleClick={() => setCategory(category)}
            title={category.title}
            id={category.id}
            image={category.image}
            description={category.description}
            key={category.id}
          />
        ))}
      </ListBody>
    </div>
  );
}
