"use client";
import React from "react";
import { ChatTripContext } from "./Chat.trip.context";
import { ChatTripActionEnum } from "./Chat.trip.types";
import { getDictionaries } from "../i18n";

export const useSetInitialContextValue = () => {
  const { state, dispatch } = React.useContext(ChatTripContext);
  const dictionaries = getDictionaries();
  const setDefaultData = async () => {
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
  };

  React.useEffect(() => {
    setDefaultData();
  }, []);
};
