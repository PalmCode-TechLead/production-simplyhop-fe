'use client'
import { ResultTripContainer } from "@/features/trip/result/container";
import { ResultTripProvider } from "@/features/trip/result/context";

export default function TripResult() {
  return (
    <ResultTripProvider>
      <ResultTripContainer />
    </ResultTripProvider>
  );
}
