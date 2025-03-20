import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import Image from "next/image";
import SVGIcon from "@/core/icons";
import { InputContainer } from "@/core/components/input_container";
import { ChatField } from "@/core/components/chatfield";

export interface RoomChatTripProps {}

export const RoomChatTrip = (props: RoomChatTripProps) => {
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "grid grid-rows-[60px_1fr_70px] grid-cols-1 place-content-start place-items-start",
        "w-full h-[calc(100vh-90px)]"
      )}
    >
      {/* header */}
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-items-start justify-start gap-[0.75rem]",
          "w-full",
          "px-[2.25rem] py-[0.75rem]",
          "border-b border-b-[#E9E9E9]"
        )}
      >
        <Image
          src={"/images/general/default_avatar.jpeg"}
          alt="sample_image"
          width={36}
          height={36}
          className={clsx(
            "w-[2.25rem] h-[2.25rem]",
            "rounded-[50%]",
            "object-center object-cover"
          )}
        />
        <div
          className={clsx(
            "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[0rem]"
          )}
        >
          <h2 className={clsx("text-[#141414] text-[1rem] font-semibold")}>
            {"Suzana Colin"}
          </h2>
          <span className={clsx("text-[0.625rem] font-normal text-[#4F5665]")}>
            {"@Suzana"}
          </span>
        </div>
      </div>

      {/* chat */}

      <div className={clsx("w-full h-full", "overflow-hidden")}></div>

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
          labelProps={{ ...dictionaries.chat.message.labelProps }}
          inputProps={{ ...dictionaries.chat.message.inputProps }}
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
          {dictionaries.chat.cta.send.children}
          <SVGIcon
            name="SendHorizonal"
            className={clsx("w-[1rem] h-[1rem]", "text-[white]")}
          />
        </button>
      </div>
    </div>
  );
};
