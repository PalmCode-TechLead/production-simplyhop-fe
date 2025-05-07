"use client";
import * as React from "react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { BookingCardChatTrip } from "../../components/booking_card";
import RoomConversationContainerChatTrip from "../../components/room_conversation_container/RoomConversationContainer.chat.trip";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import {
  useGetBookingId,
  useGetMessagesListByRoom,
  usePostBookingAccept,
  usePostBookingReject,
} from "../../react_query/hooks";
import SenderMessageItemChatTrip from "../../components/sender_message_item/SenderMessageItem.chat.trip";
import RecipientMessageItemChatTrip from "../../components/recipient_message_item/RecipientMessageItem.chat.trip";
import { queryClient } from "@/core/utils/react_query";
import { MoonLoader } from "@/core/components/moon_loader";
import { ChatTripReactQueryKey } from "../../react_query/keys";
import { GetMessageRoomsIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/message_rooms";
import { findLastIndexOfferCard } from "@/core/utils/chat/functions";
import { UserContext } from "@/core/modules/app/context";

export const RoomChatTrip = () => {
  const { state: userState } = React.useContext(UserContext);

  const searchParams = useSearchParams();
  const { state, dispatch } = React.useContext(ChatTripContext);

  const id = searchParams.get("id");
  const messageRoomId = !id ? "0" : String(id);

  // const { isLg } = useTailwindBreakpoint();

  const { isFetching: isFetchingMessagesListByRoom } =
    useGetMessagesListByRoom();
  useGetBookingId();

  const {
    mutateAsync: postBookingAccept,
    isPending: isPendingPostBookingAccept,
  } = usePostBookingAccept();

  const {
    mutateAsync: postBookingReject,
    isPending: isPendingPostBookingReject,
  } = usePostBookingReject();

  // if (!id && isLg) {
  //   return null;
  // }

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

  const handleClickReject = async () => {
    await postBookingReject();

    queryClient.invalidateQueries({
      queryKey: ChatTripReactQueryKey.GetMessageRoomsId(messageRoomByIdPayload),
      type: "all",
      refetchType: "all",
    });
  };

  const handleClickCancel = async () => {
    await postBookingReject();

    queryClient.invalidateQueries({
      queryKey: ChatTripReactQueryKey.GetMessageRoomsId(messageRoomByIdPayload),
      type: "all",
      refetchType: "all",
    });
  };

  const handleClickOffer = async () => {
    dispatch({
      type: ChatTripActionEnum.SetOfferData,
      payload: {
        ...state.offer,
        is_open: true,
      },
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

  return (
    <RoomConversationContainerChatTrip
      className={clsx(
        isFetchingMessagesListByRoom &&
          "!place-content-center !place-items-center"
      )}
    >
      {isFetchingMessagesListByRoom && (
        <MoonLoader size={48} color={"#05912A"} />
      )}
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        {conversationData.map((chat, chatIndex) => {
          const { type, role, sender_id, ...otherChatProps } = chat;
          if (type === "offer_request" || type === "booking_request") {
            const lastOfferCardIndex = findLastIndexOfferCard(
              conversationData,
              "type",
              "text"
            );
            return (
              <BookingCardChatTrip
                {...chat.booking}
                key={chatIndex}
                cta={{
                  cancel:
                    type === "offer_request" &&
                    state.room.booking.status === "pending" &&
                    chatIndex === lastOfferCardIndex &&
                    !!userState.profile?.id &&
                    String(userState.profile?.id) === sender_id
                      ? {
                          children: "Abbrechen",
                          disabled: isPendingPostBookingReject,
                          loading: isPendingPostBookingReject,
                          onClick: handleClickCancel,
                        }
                      : null,
                  reject:
                    type === "offer_request" &&
                    state.room.booking.status === "pending" &&
                    chatIndex === lastOfferCardIndex &&
                    !!userState.profile?.id &&
                    String(userState.profile?.id) !== sender_id
                      ? {
                          children: "Angebot ablehnen",
                          disabled: isPendingPostBookingReject,
                          loading: isPendingPostBookingReject,
                          onClick: handleClickReject,
                        }
                      : null,
                  bargain:
                    type === "offer_request" &&
                    state.room.booking.status === "pending" &&
                    chatIndex === lastOfferCardIndex &&
                    !!userState.profile?.id &&
                    String(userState.profile?.id) !== sender_id
                      ? {
                          children: "Ein weiteres Angebot senden",
                          disabled: false,
                          loading: false,
                          onClick: handleClickOffer,
                        }
                      : null,
                  accept:
                    type === "offer_request" &&
                    state.room.booking.status === "pending" &&
                    chatIndex === lastOfferCardIndex &&
                    !!userState.profile?.id &&
                    String(userState.profile?.id) !== sender_id
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
              <SenderMessageItemChatTrip {...otherChatProps} key={chatIndex} />
            );
          }
          return (
            <RecipientMessageItemChatTrip {...otherChatProps} key={chatIndex} />
          );
        })}
      </div>
    </RoomConversationContainerChatTrip>
  );
};
