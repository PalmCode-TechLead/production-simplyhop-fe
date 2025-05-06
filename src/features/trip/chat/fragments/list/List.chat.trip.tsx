"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { ListItemChatTrip } from "../../components/list_item";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import {
  useGetMessageRoomsList,
  usePutMessageRoomsMarkAsRead,
} from "../../react_query/hooks";
import { useRouter } from "next/navigation";
import SVGIcon from "@/core/icons";

export const ListChatTrip = () => {
  const router = useRouter();
  const dictionaries = getDictionaries();

  const { state, dispatch } = React.useContext(ChatTripContext);
  useGetMessageRoomsList();
  const { mutateAsync: putMessageRoomsMarkAsRead } =
    usePutMessageRoomsMarkAsRead();

  const handleClickList = (data: { id: string; booking_id: string }) => {
    dispatch({
      type: ChatTripActionEnum.SetRoomData,
      payload: {
        ...state.room,
        message: {
          ...state.room.message,
          items: [],
        },
        chat: {
          ...state.room.chat,
          input: {
            ...state.room.chat.input,
            value: "",
          },
        },
      },
    });
    putMessageRoomsMarkAsRead(data);

    dispatch({
      type: ChatTripActionEnum.SetListData,
      payload: {
        ...state.list,
        message: {
          ...state.list.message,
          items: state.list.message.items.map((item) => {
            return {
              ...item,
              isNew:
                item.id === data.id && item.booking_id === data.booking_id
                  ? false
                  : item.isNew,
            };
          }),
        },
      },
    });

    router.push(
      `${AppCollectionURL.private.chat()}?id=${data.id}&bookingId=${
        data.booking_id
      }`
    );
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
        "w-full max-h-[calc(100vh-360px)]",
        "overflow-auto"
      )}
    >
      {!state.list.message.items.length && (
        <div
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center",
            "w-full h-[360px]"
          )}
        >
          <SVGIcon
            name="MessageSquare"
            className={clsx("w-[3rem] h-[3rem]", "text-[#C2C2C2]")}
          />
          <span className={clsx("text-[1rem] text-[#C2C2C2] font-medium")}>
            {dictionaries.chat.list.empty.message}
          </span>
        </div>
      )}

      {!!state.list.message.items.length &&
        state.list.message.items.map((item, itemIndex) => (
          <button
            key={itemIndex}
            className={clsx("cursor-pointer", "w-full")}
            onClick={() =>
              handleClickList({
                id: item.id,
                booking_id: item.booking_id,
              })
            }
          >
            <ListItemChatTrip {...item} />
          </button>
        ))}
    </div>
  );
};
