"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { SearchField } from "@/core/components/searchfield";
import { TabList, Tab, TabGroup } from "@headlessui/react";
import { ListItemChatTrip } from "../../components/list_item";
import Link from "next/link";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { ChatTripActionEnum, ChatTripContext } from "../../context";

export const ListChatTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ChatTripContext);

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
        message: {
          ...state.list.message,
          items: Array.from({ length: 5 }).map(() => {
            return dictionaries.chat.list.data;
          }),
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

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
        "w-full"
      )}
    >
      <h1 className={clsx("text-[black] text-[1.5rem] font-semibold")}>
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
            "border-b-[0.5px] border-b-[#C2C2C2]"
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
            "w-full"
          )}
        >
          {state.list.message.items.map((item, itemIndex) => (
            <Link
              key={itemIndex}
              className={clsx("cursor-pointer")}
              href={`${AppCollectionURL.private.chat()}?id=${itemIndex}`}
            >
              <ListItemChatTrip {...item} />
            </Link>
          ))}
        </div>
      </TabGroup>
    </div>
  );
};
