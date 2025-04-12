"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { ChatField } from "@/core/components/chatfield";
import { RoomHeaderChatTrip } from "../../components/room_header";
import { useSearchParams } from "next/navigation";
import { CustomerOrderCardChatTrip } from "../../components/customer_order_card";
import { ConversationItemChatTrip } from "../../components/conversation_item";
import { DriverOrderCardChatTrip } from "../../components/driver_order_card";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import RoomConversationContainerChatTrip from "../../components/room_conversation_container/RoomConversationContainer.chat.trip";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { PageSheet } from "@/core/components/page_sheet";
import { AppCollectionURL } from "@/core/utils/router/constants/app";

export const RoomChatTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const { state, dispatch } = React.useContext(ChatTripContext);
  const [isEmojiOpen, setIsEmojiOpen] = React.useState<boolean>(false);
  const id = searchParams.get("id");
  const { isLg } = useTailwindBreakpoint();
  if (!id) {
    return null;
  }
  const conversationData = Array.from({ length: 10 }, (_, i) => i + 1).map(
    (item) => {
      if (item % 2 === 1) {
        return dictionaries.chat.room.conversation.chat.sender;
      }
      return dictionaries.chat.room.conversation.chat.recipient;
    }
  );

  const handleClickEmoji = () => {
    setIsEmojiOpen((prev) => !prev);
  };

  const handleChangeChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ChatTripActionEnum.SetRoomData,
      payload: {
        ...state.room,
        chat: {
          ...state.room.chat,
          input: {
            ...state.room.chat.input,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  const handleSelectEmoji = (emojiData: EmojiClickData) => {
    dispatch({
      type: ChatTripActionEnum.SetRoomData,
      payload: {
        ...state.room,
        chat: {
          ...state.room.chat,
          input: {
            ...state.room.chat.input,
            value: state.room.chat.input.value + emojiData.emoji,
          },
        },
      },
    });
    setIsEmojiOpen(false);
  };

  const handleClickSend = () => {
    //
  };

  if (!isLg) {
    return (
      <PageSheet isOpen={!!id} direction={"right"}>
        <div
          className={clsx(
            "grid grid-rows-[60px_1fr_70px] grid-cols-1 place-content-start place-items-start gap-[2rem]",
            "w-full h-full",
            "bg-[white]"
          )}
        >
          {/* header */}

          <RoomHeaderChatTrip
            href={AppCollectionURL.private.chat()}
            image={{ ...dictionaries.chat.room.header.image }}
            name={dictionaries.chat.room.header.name}
          />

          {/* chat */}

          <RoomConversationContainerChatTrip>
            <CustomerOrderCardChatTrip />
            <DriverOrderCardChatTrip />
            <ConversationItemChatTrip chats={conversationData} />
          </RoomConversationContainerChatTrip>

          {/* action commentar */}
          <div
            className={clsx(
              "grid-cols-[1.5rem_1fr_auto]",
              "grid  items-center content-center justify-start justify-items-start gap-[0.625rem]",
              "w-full",
              "px-[2.5rem] py-[1rem]",
              "border-t border-t-[#DFDFDF]"
            )}
          >
            <div className={clsx("relative")}>
              <button onClick={handleClickEmoji}>
                <SVGIcon
                  name="Smile"
                  className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#BDBDBD]")}
                />
              </button>
              {isEmojiOpen && (
                <EmojiPicker
                  className={clsx(
                    "!absolute",
                    "top-[-480px] left-[-175px]",
                    "z-[10]"
                  )}
                  onEmojiClick={handleSelectEmoji}
                />
              )}
            </div>

            <ChatField
              labelProps={{ ...dictionaries.chat.room.message.labelProps }}
              inputProps={{
                ...dictionaries.chat.room.message.inputProps,
                value: state.room.chat.input.value,
                onChange: handleChangeChat,
              }}
            />
            <button
              className={clsx(
                "grid grid-flow-col place-content-center place-items-center gap-[0.625rem]",
                "px-[0.75rem] py-[0.625rem]",
                "bg-[#05912A]",
                "rounded-[0.375rem]",
                "text-[0.875rem] text-[white] font-normal"
              )}
              onClick={handleClickSend}
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
      </PageSheet>
    );
  }
  return (
    <div
      className={clsx(
        "grid grid-rows-[60px_1fr_70px] grid-cols-1 place-content-start place-items-start gap-[2rem]",
        "w-full h-full",
        "bg-[white]"
      )}
    >
      {/* header */}
      <RoomHeaderChatTrip
        image={{ ...dictionaries.chat.room.header.image }}
        name={dictionaries.chat.room.header.name}
      />

      {/* chat */}

      <RoomConversationContainerChatTrip>
        <CustomerOrderCardChatTrip />
        <DriverOrderCardChatTrip />
        <ConversationItemChatTrip chats={conversationData} />
      </RoomConversationContainerChatTrip>

      {/* action commentar */}
      <div
        className={clsx(
          "grid-cols-[1.5rem_1fr_auto]",
          "grid  items-center content-center justify-start justify-items-start gap-[0.625rem]",
          "w-full",
          "px-[2.5rem] py-[1rem]",
          "border-t border-t-[#DFDFDF]"
        )}
      >
        <div className={clsx("relative")}>
          <button onClick={handleClickEmoji}>
            <SVGIcon
              name="Smile"
              className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#BDBDBD]")}
            />
          </button>
          {isEmojiOpen && (
            <EmojiPicker
              className={clsx(
                "!absolute",
                "top-[-480px] left-[-175px]",
                "z-[10]"
              )}
              onEmojiClick={handleSelectEmoji}
            />
          )}
        </div>

        <ChatField
          labelProps={{ ...dictionaries.chat.room.message.labelProps }}
          inputProps={{
            ...dictionaries.chat.room.message.inputProps,
            value: state.room.chat.input.value,
            onChange: handleChangeChat,
          }}
        />
        <button
          className={clsx(
            "grid grid-flow-col place-content-center place-items-center gap-[0.625rem]",
            "px-[0.75rem] py-[0.625rem]",
            "bg-[#05912A]",
            "rounded-[0.375rem]",
            "text-[0.875rem] text-[white] font-normal"
          )}
          onClick={handleClickSend}
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
