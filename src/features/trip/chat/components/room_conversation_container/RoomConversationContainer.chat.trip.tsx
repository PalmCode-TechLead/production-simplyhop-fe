import * as React from "react";
import clsx from "clsx";

export interface RoomConversationContainerChatTripProps {
  children?: React.ReactNode;
}

export default function RoomConversationContainerChatTrip({
  children,
}: RoomConversationContainerChatTripProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    // ref.current?.scrollIntoView({ behavior: "instant" });
  };

  React.useEffect(() => {
    if (ref.current) {
      scrollToBottom();
    }
  }, [ref.current]);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
        "w-full h-[calc(100vh-90px-14rem)]",
        "overflow-auto"
      )}
    >
      {children}
      <div id="bottom-indicator" ref={ref} />
    </div>
  );
}
