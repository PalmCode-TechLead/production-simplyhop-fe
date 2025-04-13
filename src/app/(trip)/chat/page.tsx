'use client'
import { ChatTripContainer } from "@/features/trip/chat/container";
import { ChatTripProvider } from "@/features/trip/chat/context";

export default function ChatPage() {
  return (
    <ChatTripProvider>
      <ChatTripContainer />
    </ChatTripProvider>
  );
}
