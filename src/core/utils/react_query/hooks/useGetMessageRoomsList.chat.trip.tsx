import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ChatTripReactQueryKey } from "../keys";
import Cookies from "universal-cookie";
import { fetchGetMessageRoomsUnreadList } from "@/core/services/rest/simplyhop/message_rooms";
import {
  GetMessageRoomsUnreadListErrorResponseInterface,
  GetMessageRoomsUnreadListPayloadRequestInterface,
  GetMessageRoomsUnreadListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/message_rooms";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";

export const useGetMessageRoomsUnreadList = () => {
  const { state, dispatch } = React.useContext(GlobalContext);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const payload: GetMessageRoomsUnreadListPayloadRequestInterface = {
    params: {
      include:
        "messages,passenger,driver,driverExists,passengerExists,messagesExists,booking",
      sort: "-last_message_at",
    },
  };
  const query = useQuery<
    GetMessageRoomsUnreadListSuccessResponseInterface,
    GetMessageRoomsUnreadListErrorResponseInterface
  >({
    queryKey: ChatTripReactQueryKey.GetMessageRoomsUnreadList(payload),
    queryFn: () => {
      return fetchGetMessageRoomsUnreadList(payload);
    },
    enabled: !!token,
    refetchInterval: 500,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: GlobalActionEnum.SetChatData,
        payload: {
          ...state.chat,
          count: data.meta.total,
        },
      });
    }
  }, [query.isFetching, query.data]);

  return query;
};
