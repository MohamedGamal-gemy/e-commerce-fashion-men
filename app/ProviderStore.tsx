"use client"
import { queryClient } from "@/store";
import { QueryClientProvider } from "@tanstack/react-query";

const ProviderStore = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section>
      <QueryClientProvider client={queryClient}>
        <main>{children}</main>
      </QueryClientProvider>
    </section>
  );
};

export default ProviderStore;
