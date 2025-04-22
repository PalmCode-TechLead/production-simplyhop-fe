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

export const useGetMessagesList = () => {
  const { state, dispatch } = React.useContext(ChatTripContext);

  const payload: GetMessagesListPayloadRequestInterface = {
    params: {
      include: "passenger",
    },
  };
  const query = useQuery<
    GetMessagesListSuccessResponseInterface,
    GetMessagesListErrorResponseInterface
  >({
    queryKey: ChatTripReactQueryKey.GetMessagesList(),
    queryFn: () => {
      return fetchGetMessagesList();
    },
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
    }
  }, [query.data, query.isFetching]);
  return query;
};
