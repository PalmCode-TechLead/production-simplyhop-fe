import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ChatTripReactQueryKey } from "../keys";

import { ChatTripActionEnum, ChatTripContext } from "../../context";

import { fetchGetMessageRoomsId } from "@/core/services/rest/simplyhop/message_rooms";
import {
  GetMessageRoomsIdErrorResponseInterface,
  GetMessageRoomsIdPayloadRequestInterface,
  GetMessageRoomsIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/message_rooms";
import { UserContext } from "@/core/modules/app/context";
import { useSearchParams } from "next/navigation";

export const useGetMessageRoomsId = () => {
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(ChatTripContext);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const messageRoomId = !id ? "0" : String(id);

  const payload: GetMessageRoomsIdPayloadRequestInterface = {
    path: {
      id: messageRoomId,
    },
    params: {
      include:
        "messages,passenger,driver,driverExists,passengerExists,messagesExists,booking",
    },
  };
  const query = useQuery<
    GetMessageRoomsIdSuccessResponseInterface,
    GetMessageRoomsIdErrorResponseInterface
  >({
    queryKey: ChatTripReactQueryKey.GetMessageRoomsId(payload),
    queryFn: () => {
      return fetchGetMessageRoomsId(payload);
    },
    enabled: !!id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      const isPassenger = userState.profile?.id === data.data.passenger_id;
      dispatch({
        type: ChatTripActionEnum.SetRoomData,
        payload: {
          ...state.room,
          id: data.data.id,
          header: {
            ...state.room.header,
            avatar: {
              src: !isPassenger
                ? data.data.passenger?.avatar
                : data.data.driver?.avatar,
              alt: isPassenger ? "passenger" : "driver",
            },
            name: !isPassenger
              ? `${data.data.passenger?.first_name} ${data.data.passenger?.last_name}`
              : `${data.data.driver?.first_name} ${data.data.driver?.last_name}`,
          },
          booking: {
            status: data.data.booking?.status ?? null,
          },
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
