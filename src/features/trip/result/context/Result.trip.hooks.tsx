"use client";
import { useSearchParams } from "next/navigation";
import * as React from "react";

export const useRideFilterResultTrip = (params?: string) => {
  if (!params) {
    return;
  }

  const searchParams = useSearchParams();

  React.useEffect(() => {}, []);
};
