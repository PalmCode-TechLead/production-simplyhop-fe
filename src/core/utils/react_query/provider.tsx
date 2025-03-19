"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";

export interface ReactQueryProviderProps {
  children?: React.ReactNode;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
    },
  },
});

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
