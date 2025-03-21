import { VehicleSupportContainer } from "@/features/support/vehicle/container";
import { VehicleSupportProvider } from "@/features/support/vehicle/context";

export default function VehiclePage() {
  return (
    <VehicleSupportProvider>
      <VehicleSupportContainer />
    </VehicleSupportProvider>
  );
}
