import { AppContainer } from "@/core/modules/app/container";
import { MyListTripContainer } from "@/features/trip/my_list/container";
import { MyListTripProvider } from "@/features/trip/my_list/context";

export default function MyTripPage() {
  return (
    <MyListTripProvider>
      <AppContainer>
        <MyListTripContainer />
      </AppContainer>
    </MyListTripProvider>
  );
}
