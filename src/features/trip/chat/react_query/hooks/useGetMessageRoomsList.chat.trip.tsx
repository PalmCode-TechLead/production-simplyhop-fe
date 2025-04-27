import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ChatTripReactQueryKey } from "../keys";

import { ChatTripActionEnum, ChatTripContext } from "../../context";

import { fetchGetMessageRoomsList } from "@/core/services/rest/simplyhop/message_rooms";
import {
  GetMessageRoomsListErrorResponseInterface,
  GetMessageRoomsListPayloadRequestInterface,
  GetMessageRoomsListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/message_rooms";
import { UserContext } from "@/core/modules/app/context";
import dayjs from "dayjs";

export const useGetMessageRoomsList = () => {
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(ChatTripContext);

  const payload: GetMessageRoomsListPayloadRequestInterface = {
    params: {
      include:
        "messages,passenger,driver,driverExists,passengerExists,messagesExists",
      "filter[passenger_id]":
        state.list.tab.selected?.id === "offered-trips"
          ? userState.profile.id ?? undefined
          : undefined,
      "filter[driver_id]":
        state.list.tab.selected?.id === "my-rides"
          ? userState.profile.id ?? undefined
          : undefined,
    },
  };
  const query = useQuery<
    GetMessageRoomsListSuccessResponseInterface,
    GetMessageRoomsListErrorResponseInterface
  >({
    queryKey: ChatTripReactQueryKey.GetMessageRoomsList(payload),
    queryFn: () => {
      return fetchGetMessageRoomsList(payload);
    },
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      dispatch({
        type: ChatTripActionEnum.SetListData,
        payload: {
          ...state.list,
          message: {
            ...state.list.message,
            items: data.data.map((item) => {
              const isPassenger = userState.profile.id === item.passenger_id;
              const lastMessage = item.messages?.find(
                (_, index) => index === (item.messages?.length ?? 1) - 1
              );

              const lastMessageObject: { [key: string]: string } = !lastMessage
                ? {}
                : typeof lastMessage.contents === "string"
                ? JSON.parse(lastMessage.contents)
                : lastMessage.contents;
              const displayMessage = !Object.keys(lastMessageObject).length
                ? ""
                : lastMessageObject?.type !== "text"
                ? lastMessageObject.text
                : lastMessageObject?.message ?? "";
              const date = !lastMessage
                ? ""
                : dayjs(lastMessage.created_at).format("MMM DD");
              return {
                id: String(item.id),
                booking_id: String(item.ride_booking_id),
                avatar: {
                  src: isPassenger
                    ? item.passenger?.avatar
                    : item.driver?.avatar,
                  alt: isPassenger ? "passenger" : "driver",
                },
                name: isPassenger
                  ? `${item.passenger?.first_name} ${item.passenger?.last_name}`
                  : `${item.driver?.first_name} ${item.driver?.last_name}`,
                message: displayMessage,
                date: date,
              };
            }),
          },
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
