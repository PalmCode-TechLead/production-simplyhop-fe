import { PlanRideTripContainer } from "@/features/trip/plan_ride/container";
import { PlanRideTripProvider } from "@/features/trip/plan_ride/context";

export default function PlanRidePage() {
  return (
    <PlanRideTripProvider>
      <PlanRideTripContainer />
    </PlanRideTripProvider>
  );
}
