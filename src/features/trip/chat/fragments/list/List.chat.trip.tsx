"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { SearchField } from "@/core/components/searchfield";
import { TabList, Tab, TabGroup } from "@headlessui/react";
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
  const { mutate: putMessageRoomsMarkAsRead } = usePutMessageRoomsMarkAsRead();

  React.useEffect(() => {
    dispatch({
      type: ChatTripActionEnum.SetListData,
      payload: {
        ...state.list,
        tab: {
          ...state.list.tab,
          selected:
            dictionaries.tab.items.find((_, index) => index === 0) ?? null,
        },
      },
    });
  }, []);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ChatTripActionEnum.SetListData,
      payload: {
        ...state.list,
        search: {
          ...state.list.search,
          value: e.currentTarget.value,
        },
      },
    });
  };

  const handleClickTab = (data: { id: string; name: string } | null) => {
    dispatch({
      type: ChatTripActionEnum.SetListData,
      payload: {
        ...state.list,
        tab: {
          ...state.list.tab,
          selected: data,
        },
      },
    });
  };

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
    router.push(
      `${AppCollectionURL.private.chat()}?id=${data.id}&bookingId=${
        data.booking_id
      }`
    );
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1rem] lg:gap-[2rem]",
        "w-full",
        "pt-[1.5rem]",
        "sticky top-[calc(90px+1.5rem)]"
      )}
    >
      <h1
        className={clsx(
          "text-[black] text-[1.125rem] lg:text-[1.5rem] font-semibold"
        )}
      >
        {dictionaries.title}
      </h1>

      {/* Search */}
      <SearchField
        labelProps={{ ...dictionaries.search.labelProps }}
        inputProps={{
          ...dictionaries.search.inputProps,
          value: state.list.search.value,
          onChange: handleChangeSearch,
        }}
      />
      {/* Tab */}
      <TabGroup
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
          "w-full"
        )}
      >
        <TabList
          className={clsx(
            "flex justify-between",
            "w-full",
            "border-b-[0.5px] border-b-[#C2C2C2]",
            "overflow-auto"
          )}
        >
          {dictionaries.tab.items.map((item, itemIndex) => (
            <Tab
              key={itemIndex}
              className={clsx(
                "text-[#C2C2C2] data-[selected]:text-[#5AC53D] font-normal data-[selected]:font-semibold text-[1rem] ",
                "outline-none",
                "data-[selected]:border-b data-[selected]:border-b-[#5AC53D]",
                "cursor-pointer"
              )}
              onClick={() => handleClickTab(item)}
            >
              {item.name}
            </Tab>
          ))}
        </TabList>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full max-h-[360px]",
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
      </TabGroup>
    </div>
  );
};
