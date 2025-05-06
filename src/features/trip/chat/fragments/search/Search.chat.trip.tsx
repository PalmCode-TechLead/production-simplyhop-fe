import * as React from "react";
import { getDictionaries } from "../../i18n";
import { SearchField } from "@/core/components/searchfield";
import { ChatTripActionEnum, ChatTripContext } from "../../context";

export const SearchChatTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ChatTripContext);
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
  return (
    <SearchField
      labelProps={{ ...dictionaries.search.labelProps }}
      inputProps={{
        ...dictionaries.search.inputProps,
        value: state.list.search.value,
        onChange: handleChangeSearch,
      }}
    />
  );
};
