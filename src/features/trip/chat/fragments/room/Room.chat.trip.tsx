"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { ChatField } from "@/core/components/chatfield";
import { RoomHeaderChatTrip } from "../../components/room_header";
import { useSearchParams } from "next/navigation";
import { BookingCardChatTrip } from "../../components/booking_card";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import RoomConversationContainerChatTrip from "../../components/room_conversation_container/RoomConversationContainer.chat.trip";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import {
  useGetMessageRoomsId,
  useGetMessagesListByRoom,
  usePostBookingAccept,
  usePostBookingOffer,
  usePostBookingReject,
} from "../../react_query/hooks";
import SenderMessageItemChatTrip from "../../components/sender_message_item/SenderMessageItem.chat.trip";
import RecipientMessageItemChatTrip from "../../components/recipient_message_item/RecipientMessageItem.chat.trip";
import { usePostMessagesChat } from "../../react_query/hooks";
import { queryClient } from "@/core/utils/react_query";
import { MoonLoader } from "@/core/components/moon_loader";
import { ChatTripReactQueryKey } from "../../react_query/keys";
import { GetMessageRoomsIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/message_rooms";

export const RoomChatTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const { state, dispatch } = React.useContext(ChatTripContext);
  const [isEmojiOpen, setIsEmojiOpen] = React.useState<boolean>(false);
  const id = searchParams.get("id");
  const messageRoomId = !id ? "0" : String(id);

  const { isLg } = useTailwindBreakpoint();
  useGetMessageRoomsId();
  useGetMessagesListByRoom();
  const { mutateAsync: postMessagesChat, isPending: isPendingPostMessageChat } =
    usePostMessagesChat();
  const {
    mutateAsync: postBookingAccept,
    isPending: isPendingPostBookingAccept,
  } = usePostBookingAccept();
  const {
    mutateAsync: postBookingOffer,
    isPending: isPendingPostBookingOffer,
  } = usePostBookingOffer();
  const {
    mutateAsync: postBookingReject,
    isPending: isPendingPostBookingReject,
  } = usePostBookingReject();

  if (!id && isLg) {
    return null;
  }

  const messageRoomByIdPayload: GetMessageRoomsIdPayloadRequestInterface = {
    path: {
      id: messageRoomId,
    },
    params: {
      include:
        "messages,passenger,driver,driverExists,passengerExists,messagesExists,booking",
    },
  };

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
    queryClient.invalidateQueries();
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

    queryClient.invalidateQueries({
      queryKey: ChatTripReactQueryKey.GetMessageRoomsId(messageRoomByIdPayload),
      type: "all",
      refetchType: "all",
    });
  };

  const handleClickOffer = async () => {
    await postBookingOffer();
    queryClient.invalidateQueries({
      queryKey: ChatTripReactQueryKey.GetMessageRoomsId(messageRoomByIdPayload),
      type: "all",
      refetchType: "all",
    });
  };

  const handleClickAccept = async () => {
    await postBookingAccept();
    queryClient.invalidateQueries({
      queryKey: ChatTripReactQueryKey.GetMessageRoomsId(messageRoomByIdPayload),
      type: "all",
      refetchType: "all",
    });
  };

  const isLoadingSendChat = isPendingPostMessageChat;
  const isDisabledSendChat =
    isPendingPostMessageChat || state.room.booking.status !== "accepted";
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
        avatar={state.room.header.avatar}
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
            if (type === "offer_request" || type === "booking_request") {
              return (
                <BookingCardChatTrip
                  {...chat.booking}
                  key={chatIndex}
                  cta={{
                    reject:
                      type === "offer_request" &&
                      state.room.booking.status === "pending"
                        ? {
                            children: "Angebot ablehnen",
                            disabled: isPendingPostBookingReject,
                            loading: isPendingPostBookingReject,
                            onClick: handleClickReject,
                          }
                        : null,
                    bargain:
                      type === "offer_request" &&
                      state.room.booking.status === "pending"
                        ? {
                            children: "Ein weiteres Angebot senden",
                            disabled: isPendingPostBookingOffer,
                            loading: isPendingPostBookingOffer,
                            onClick: handleClickOffer,
                          }
                        : null,
                    accept:
                      type === "offer_request" &&
                      state.room.booking.status === "pending"
                        ? {
                            children: "Angebot annehmen",
                            disabled: isPendingPostBookingAccept,
                            loading: isPendingPostBookingAccept,
                            onClick: handleClickAccept,
                          }
                        : null,
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
          "px-[1rem] lg:px-[2.5rem] py-[1rem]",
          "border-t border-t-[#DFDFDF]"
        )}
      >
        <div className={clsx("relative")}>
          <button
            onClick={() => {
              if (!isDisabledSendChat) return;
              handleClickEmoji();
            }}
          >
            <SVGIcon
              name="Smile"
              className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#BDBDBD]")}
            />
          </button>
          {isEmojiOpen && (
            <EmojiPicker
              className={clsx(
                "!absolute",
                "top-[-480px] lg:left-[-175px] left-[0px]",
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
            disabled: state.room.booking.status !== "accepted",
            value: state.room.chat.input.value,
            onChange: handleChangeChat,
          }}
        />
        <button
          className={clsx(
            "grid grid-flow-col place-content-center place-items-center gap-[0.625rem]",
            "px-[0.75rem] py-[0.625rem]",
            "bg-[#05912A] disabled:bg-[#F6F6F6]",
            "rounded-[0.375rem]",
            "text-[0.875rem] text-[white] disabled:text-[#767676] font-normal"
          )}
          disabled={isDisabledSendChat}
          onClick={handleClickSend}
        >
          {dictionaries.chat.room.cta.send.children}
          {isLoadingSendChat ? (
            <MoonLoader size={16} color={"white"} />
          ) : (
            <SVGIcon
              name="SendHorizonal"
              className={clsx(
                "w-[1rem] h-[1rem]",
                isDisabledSendChat ? "text-[#767676]" : "text-[white]"
              )}
            />
          )}
        </button>
      </div>
    </div>
  );
};
