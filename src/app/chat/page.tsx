import { AppContainer } from "@/core/modules/app/container";
import { ChatTripContainer } from "@/features/trip/chat/container";
import { ChatTripProvider } from "@/features/trip/chat/context";

export default function ChatPage() {
  return (
    <ChatTripProvider>
      <AppContainer>
        <ChatTripContainer />
      </AppContainer>
    </ChatTripProvider>
  );
}
