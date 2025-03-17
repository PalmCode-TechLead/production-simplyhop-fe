import { AppContainer } from "@/core/modules/app/container";
import { FindRideContainer } from "@/features/ride/find/container/Find.ride.container";

export default function Home() {
  return (
    <AppContainer>
      <FindRideContainer />
    </AppContainer>
  );
}
