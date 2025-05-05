import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import {
  GlobalActionEnum,
  GlobalContext,
  UserContext,
} from "@/core/modules/app/context";
import {
  GetMessageRoomsListPayloadRequestInterface,
  PutMessageRoomsMarkAsReadErrorResponseInterface,
  PutMessageRoomsMarkAsReadPayloadRequestInterface,
  PutMessageRoomsMarkAsReadSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/message_rooms";
import { fetchPutMessageRoomsMarkAsRead } from "@/core/services/rest/simplyhop/message_rooms";
import { ChatTripReactQueryKey } from "../keys";
import { v4 as uuidv4 } from "uuid";
import { ChatTripContext } from "../../context";
import { queryClient } from "@/core/utils/react_query";

export const usePutMessageRoomsMarkAsRead = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const { state: userState } = React.useContext(UserContext);
  const { state } = React.useContext(ChatTripContext);
  const mutation = useMutation<
    PutMessageRoomsMarkAsReadSuccessResponseInterface,
    PutMessageRoomsMarkAsReadErrorResponseInterface,
    { id: string }
  >({
    mutationKey: ChatTripReactQueryKey.PutMessageRoomsMarkAsRead(),
    mutationFn: (data: { id: string }) => {
      const payload: PutMessageRoomsMarkAsReadPayloadRequestInterface = {
        path: {
          roomId: data.id,
        },
      };
      return fetchPutMessageRoomsMarkAsRead(payload);
    },
    onSuccess() {
      const payload: GetMessageRoomsListPayloadRequestInterface = {
        params: {
          include:
            "messages,passenger,driver,driverExists,passengerExists,messagesExists,booking",
          "filter[passenger_id]":
            state.list.tab.selected?.id === "offered-trips"
              ? userState.profile?.id ?? undefined
              : undefined,
          "filter[driver_id]":
            state.list.tab.selected?.id === "my-rides"
              ? userState.profile?.id ?? undefined
              : undefined,
          search: !state.list.search.value.length
            ? undefined
            : state.list.search.value,
          sort: "-last_message_at",
        },
      };
      queryClient.invalidateQueries({
        queryKey: ChatTripReactQueryKey.GetMessageRoomsList(payload),
        type: "all",
        refetchType: "all",
      });
    },
    onError(error) {
      dispatchGlobal({
        type: GlobalActionEnum.SetAlertData,
        payload: {
          ...globalState.alert,
          items: [
            ...globalState.alert.items,
            {
              id: uuidv4(),
              variant: "error",
              message: error.message,
            },
          ],
        },
      });
    },
  });
  return mutation;
};
