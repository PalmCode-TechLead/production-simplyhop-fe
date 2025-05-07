import { AlertApp } from "@/core/modules/app/fragments/alert";
import { MyListTripContainer } from "@/features/trip/my_list/container";
import { MyListTripProvider } from "@/features/trip/my_list/context";

export default function MyTripPage() {
  return (
    <MyListTripProvider>
      <MyListTripContainer />
      <AlertApp />
    </MyListTripProvider>
  );
}
