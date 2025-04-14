"use client";
import { Suspense } from "react";
import { ChatTripContainer } from "@/features/trip/chat/container";
import { ChatTripProvider } from "@/features/trip/chat/context";

export default function ChatPage() {
  return (
    <ChatTripProvider>
      <Suspense fallback={<div />}>
        <ChatTripContainer />
      </Suspense>
    </ChatTripProvider>
  );
}
