import { AlertApp } from "@/core/modules/app/fragments/alert";
import { VehiclesSupportContainer } from "@/features/support/vehicles/container";
import { VehiclesSupportProvider } from "@/features/support/vehicles/context";

export default function VehiclesPage() {
  return (
    <VehiclesSupportProvider>
      <VehiclesSupportContainer />
      <AlertApp />
    </VehiclesSupportProvider>
  );
}
