"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { ChatField } from "@/core/components/chatfield";
import { RoomHeaderChatTrip } from "../../components/room_header";
import { useSearchParams } from "next/navigation";
import { OrderCardChatTrip } from "../../components/order_card";

export const RoomChatTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  if (!id) {
    return null;
  }
  return (
    <div
      className={clsx(
        "grid grid-rows-[60px_1fr_70px] grid-cols-1 place-content-start place-items-start gap-[2rem]",
        "w-full h-[calc(100vh-90px)]"
      )}
    >
      {/* header */}
      <RoomHeaderChatTrip
        image={{ ...dictionaries.chat.room.header.image }}
        name={dictionaries.chat.room.header.name}
        account_name={dictionaries.chat.room.header.account}
      />

      {/* chat */}

      <div className={clsx("w-full", "overflow-hidden")}>
        <OrderCardChatTrip />
      </div>

      {/* action commentar */}
      <div
        className={clsx(
          "grid grid-cols-[1fr_auto] items-center content-center justify-start justify-items-start gap-[0.625rem]",
          "w-full",
          "px-[2.5rem] py-[1rem]",
          "border-t border-t-[#DFDFDF]"
        )}
      >
        <ChatField
          labelProps={{ ...dictionaries.chat.room.message.labelProps }}
          inputProps={{ ...dictionaries.chat.room.message.inputProps }}
        />
        <button
          className={clsx(
            "grid grid-flow-col place-content-center place-items-center gap-[0.625rem]",
            "px-[0.75rem] py-[0.625rem]",
            "bg-[#05912A]",
            "rounded-[0.375rem]",
            "text-[0.875rem] text-[white] font-normal"
          )}
        >
          {dictionaries.chat.room.cta.send.children}
          <SVGIcon
            name="SendHorizonal"
            className={clsx("w-[1rem] h-[1rem]", "text-[white]")}
          />
        </button>
      </div>
    </div>
  );
};
