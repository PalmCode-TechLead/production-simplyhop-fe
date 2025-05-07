import { AlertApp } from "@/core/modules/app/fragments/alert";
import { VehicleUpdateSupportContainer } from "@/features/support/vehicle_update/container";
import { VehicleUpdateSupportProvider } from "@/features/support/vehicle_update/context";

export default function VehicleUpdateSupportPage() {
  return (
    <VehicleUpdateSupportProvider>
      <VehicleUpdateSupportContainer />
      <AlertApp />
    </VehicleUpdateSupportProvider>
  );
}
