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

export const useGetMessageRoomsList = () => {
  const { state, dispatch } = React.useContext(ChatTripContext);

  const payload: GetMessageRoomsListPayloadRequestInterface = {
    params: {
      include: "messages,passenger,driver,driverExists,passengerExists,messagesExists",
    },
  };
  const query = useQuery<
    GetMessageRoomsListSuccessResponseInterface,
    GetMessageRoomsListErrorResponseInterface
  >({
    queryKey: ChatTripReactQueryKey.GetMessageRoomsList(),
    queryFn: () => {
      return fetchGetMessageRoomsList(payload);
    },
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
    }
  }, [query.data, query.isFetching]);
  return query;
};
