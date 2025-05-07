import * as React from "react";
import { getDictionaries } from "../../i18n";
import { SearchField } from "@/core/components/searchfield";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import { PAGINATION } from "@/core/utils/pagination/contants";

export const SearchChatTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ChatTripContext);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value, "ini apa");
    dispatch({
      type: ChatTripActionEnum.SetListData,
      payload: {
        ...state.list,
        search: {
          ...state.list.search,
          value: e.currentTarget.value,
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
    <SearchField
      labelProps={{ ...dictionaries.search.labelProps }}
      inputProps={{
        ...dictionaries.search.inputProps,
        value: state.list.search.value,
        onChange: handleChangeSearch,
      }}
      debounce
    />
  );
};
