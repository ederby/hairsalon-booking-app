import Main from "./components/ui/Main";
import BookingInfoProvider from "./hooks/BookingInfoContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BookingInfoProvider>
        <Main />
      </BookingInfoProvider>
    </QueryClientProvider>
  );
}
