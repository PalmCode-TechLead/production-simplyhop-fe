import { ArchiveTripContainer } from "@/features/trip/archive/container";
import { ArchiveTripProvider } from "@/features/trip/archive/context";

export default function MyTripPage() {
  return (
    <ArchiveTripProvider>
      <ArchiveTripContainer />
    </ArchiveTripProvider>
  );
}
