import { VehicleUpdateSupportContainer } from "@/features/support/vehicle_update/container";
import { VehicleUpdateSupportProvider } from "@/features/support/vehicle_update/context";

export default function VehicleUpdateSupportPage() {
  return (
    <VehicleUpdateSupportProvider>
      <VehicleUpdateSupportContainer />
    </VehicleUpdateSupportProvider>
  );
}
