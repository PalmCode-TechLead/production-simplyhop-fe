"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { ChatField } from "@/core/components/chatfield";
import { RoomHeaderChatTrip } from "../../components/room_header";
import { useSearchParams } from "next/navigation";
import { CustomerOrderCardChatTrip } from "../../components/customer_order_card";
import { DriverOrderCardChatTrip } from "../../components/driver_order_card";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import RoomConversationContainerChatTrip from "../../components/room_conversation_container/RoomConversationContainer.chat.trip";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import {
  useGetMessagesListByRoom,
  usePostBookingAccept,
  usePostBookingOffer,
  usePostBookingReject,
} from "../../react_query/hooks";
import SenderMessageItemChatTrip from "../../components/sender_message_item/SenderMessageItem.chat.trip";
import RecipientMessageItemChatTrip from "../../components/recipient_message_item/RecipientMessageItem.chat.trip";
import { usePostMessagesChat } from "../../react_query/hooks";

export const RoomChatTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const { state, dispatch } = React.useContext(ChatTripContext);
  const [isEmojiOpen, setIsEmojiOpen] = React.useState<boolean>(false);
  const id = searchParams.get("id");
  const { isLg } = useTailwindBreakpoint();
  useGetMessagesListByRoom();
  const { mutateAsync: postMessagesChat } = usePostMessagesChat();
  const { mutateAsync: postBookingAccept } = usePostBookingAccept();
  const { mutateAsync: postBookingOffer } = usePostBookingOffer();
  const { mutateAsync: postBookingReject } = usePostBookingReject();

  if (!id && isLg) {
    return null;
  }
  const conversationData = state.room.message.items;

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

  const handleClickSend = async () => {
    const res = await postMessagesChat();
    if (!res) return;
    dispatch({
      type: ChatTripActionEnum.SetRoomData,
      payload: {
        ...state.room,
        chat: {
          ...state.room.chat,
          input: {
            ...state.room.chat.input,
            value: "",
          },
        },
      },
    });
  };

  const handleClickReject = async () => {
    await postBookingReject();
  };

  const handleClickOffer = async () => {
    await postBookingOffer();
  };

  const handleClickAccept = async () => {
    await postBookingAccept();
  };

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
        href={AppCollectionURL.private.chat()}
        image={{ ...dictionaries.chat.room.header.image }}
        name={state.room.header.name}
      />

      {/* chat */}

      <RoomConversationContainerChatTrip>
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full"
          )}
        >
          {conversationData.map((chat, chatIndex) => {
            const { type, role, ...otherChatProps } = chat;
            if (type === "booking_request") {
              return (
                <CustomerOrderCardChatTrip {...chat.booking} key={chatIndex} />
              );
            }
            if (type === "offer_request") {
              return (
                <DriverOrderCardChatTrip
                  {...chat.booking}
                  key={chatIndex}
                  cta={{
                    reject: {
                      children: "Angebot ablehnen",
                      onClick: handleClickReject,
                    },
                    bargain: {
                      children: "Ein weiteres Angebot senden",
                      onClick: handleClickOffer,
                    },
                    accept: {
                      children: "Angebot annehmen",
                      onClick: handleClickAccept,
                    },
                  }}
                />
              );
            }
            if (role === "sender") {
              return (
                <SenderMessageItemChatTrip
                  {...otherChatProps}
                  key={chatIndex}
                />
              );
            }
            return (
              <RecipientMessageItemChatTrip
                {...otherChatProps}
                key={chatIndex}
              />
            );
          })}
        </div>
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
