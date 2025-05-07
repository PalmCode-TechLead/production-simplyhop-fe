import { AlertApp } from "@/core/modules/app/fragments/alert";
import { VehicleCreateSupportContainer } from "@/features/support/vehicle_create/container";
import { VehicleCreateSupportProvider } from "@/features/support/vehicle_create/context";

export default function VehicleCreateSupportPage() {
  return (
    <VehicleCreateSupportProvider>
      <VehicleCreateSupportContainer />
      <AlertApp />
    </VehicleCreateSupportProvider>
  );
}
