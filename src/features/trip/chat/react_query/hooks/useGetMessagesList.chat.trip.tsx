import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ChatTripReactQueryKey } from "../keys";

import { ChatTripActionEnum, ChatTripContext } from "../../context";

import { fetchGetMessagesList } from "@/core/services/rest/simplyhop/messages";
import {
  GetMessagesListErrorResponseInterface,
  GetMessagesListPayloadRequestInterface,
  GetMessagesListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/messages";
import { useSearchParams } from "next/navigation";
import { UserContext } from "@/core/modules/app/context";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isSameOrToday from "dayjs/plugin/isSameOrAfter";
import "dayjs/locale/de";

dayjs.extend(utc);
dayjs.extend(isSameOrToday);
dayjs.locale("de");

function formatChatTime(timestamp: string) {
  const time = dayjs.utc(timestamp).local(); // convert ke local time
  const now = dayjs();

  if (time.isSame(now, "day")) {
    return time.format("h:mm A"); // Contoh: 3:45 PM
  } else {
    return time.format("DD MMM YYYY"); // Contoh: 22 Apr 2025
  }
}

export const useGetMessagesList = () => {
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(ChatTripContext);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const messageRoomId = !id ? 0 : Number(String(id.split(".")[0]));
  const rideBookingId = !id ? 0 : Number(String(id.split(".")[1]));
  const payload: GetMessagesListPayloadRequestInterface = {
    params: {
      // include: "passenger",
      message_room_id: messageRoomId,
      ride_booking_id: rideBookingId,
    },
  };

  const query = useQuery<
    GetMessagesListSuccessResponseInterface,
    GetMessagesListErrorResponseInterface
  >({
    queryKey: ChatTripReactQueryKey.GetMessagesList(),
    queryFn: () => {
      return fetchGetMessagesList(payload);
    },
    enabled: !!id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: ChatTripActionEnum.SetRoomData,
        payload: {
          ...state.room,
          message: {
            ...state.room.message,
            items: data.data.map((item) => {
              return {
                id: "sender",
                type: item.contents.type,
                role:
                  userState.profile.id === item.sender_id
                    ? "sender"
                    : "recipient",
                // TODO: need rules if more than one day etc2
                time: formatChatTime(item.created_at),
                name: "Jack Raymonds",
                image: {
                  src: "/images/chat/sender.png",
                  width: 36,
                  height: 36,
                  alt: "sender",
                },
                message: item.contents.message,
              };
            }),
          },
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
