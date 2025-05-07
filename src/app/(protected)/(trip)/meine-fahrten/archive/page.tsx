import { AlertApp } from "@/core/modules/app/fragments/alert";
import { ArchiveTripContainer } from "@/features/trip/archive/container";
import { ArchiveTripProvider } from "@/features/trip/archive/context";

export default function MyTripPage() {
  return (
    <ArchiveTripProvider>
      <ArchiveTripContainer />
      <AlertApp />
    </ArchiveTripProvider>
  );
}
