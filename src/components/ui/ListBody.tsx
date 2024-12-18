type ListBodyProps = {
  children: React.ReactNode;
};
export default function ListBody({ children }: ListBodyProps): JSX.Element {
  return <ul className="flex flex-row flex-wrap w-full">{children}</ul>;
}
