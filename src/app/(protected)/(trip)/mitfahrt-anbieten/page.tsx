import { AlertApp } from "@/core/modules/app/fragments/alert";
import { PlanRideTripContainer } from "@/features/trip/plan_ride/container";
import { PlanRideTripProvider } from "@/features/trip/plan_ride/context";

export default function PlanRidePage() {
  return (
    <PlanRideTripProvider>
      <PlanRideTripContainer />
      <AlertApp />
    </PlanRideTripProvider>
  );
}
