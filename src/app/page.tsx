import { AppContainer } from "@/core/modules/app/container";
import { FindRideContainer } from "@/features/ride/find/container/Find.ride.container";
import { FindRideProvider } from "@/features/ride/find/context";

export default function Home() {
  return (
    <FindRideProvider>
      <AppContainer>
        <FindRideContainer />
      </AppContainer>
    </FindRideProvider>
  );
}
