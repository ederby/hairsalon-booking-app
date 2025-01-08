import { CircleUserRound } from "lucide-react";

type ListItemProps = {
  handleClick: () => void;
  id: number;
  image: string;
  title: string;
  description?: string;
};

export default function ListItem({
  handleClick,
  image,
  title,
  id = 0,
  description = "",
}: ListItemProps): JSX.Element {
  console.log(image);
  const placeholderImageLetter = title.split("").at(0)?.toUpperCase();

  return (
    <li
      onClick={handleClick}
      className="w-full flex gap-4 items-center cursor-pointer hover:bg-teal-50 px-4 py-3"
    >
      <div className="rounded-xl overflow-hidden min-w-[80px]">
        {id === -1 ? (
          <div className="object-cover transition-all hover:scale-105 aspect-square max-w-20 bg-zinc-200 flex justify-center items-center">
            <CircleUserRound size={35} strokeWidth={1} color="#a1a1aa" />
          </div>
        ) : id !== -1 && !image ? (
          <div className="object-cover transition-all hover:scale-105 aspect-square max-w-20 bg-zinc-200 flex justify-center items-center">
            <span className="text-4xl text-zinc-50 no-underline">
              {placeholderImageLetter}
            </span>
          </div>
        ) : (
          <img
            src={image}
            alt={title}
            className="object-cover transition-all hover:scale-105 aspect-square max-w-20"
          />
        )}
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="text-lg font-medium leading-none text-zinc-800">
          {title}
        </h3>
        {!!description && id !== -1 && (
          <p className="text-md text-muted-foreground text-zinc-500">
            {description}
          </p>
        )}
      </div>
    </li>
  );
}
