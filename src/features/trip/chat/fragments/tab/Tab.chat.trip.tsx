import * as React from "react";
import clsx from "clsx";
import { Tab, TabList } from "@headlessui/react";
import { getDictionaries } from "../../i18n";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import { PAGINATION } from "@/core/utils/pagination/contants";

export const TabChatTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ChatTripContext);
  const handleClickTab = (data: { id: string; name: string } | null) => {
    dispatch({
      type: ChatTripActionEnum.SetListData,
      payload: {
        ...state.list,
        search: {
          value: "",
        },
        tab: {
          ...state.list.tab,
          selected: data,
        },
        message: {
          ...state.list.message,
          items: [],
          pagination: {
            ...state.list.message.pagination,
            current: PAGINATION.NUMBER,
            last: null,
          },
        },
      },
    });
  };
  return (
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
  );
};
