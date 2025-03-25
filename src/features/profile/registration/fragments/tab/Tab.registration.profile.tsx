"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  RegistrationProfileActionEnum,
  RegistrationProfileContext,
} from "../../context";
import { TabButton } from "@/core/components/tab_button";

export const TabRegistrationProfile = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(RegistrationProfileContext);

  React.useEffect(() => {
    dispatch({
      type: RegistrationProfileActionEnum.SetTabData,
      payload: {
        ...state.tab,
        selected:
          dictionaries.tab.items.find((_, index) => index === 0) ?? null,
      },
    });
  }, [dictionaries.tab.items]);

  const handleClickTabButton = (data: { id: string; name: string }) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetTabData,
      payload: {
        ...state.tab,
        selected: data,
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      {dictionaries.tab.items.map((menu, index) => {
        return (
          <TabButton
            key={index}
            selected={state.tab.selected?.id === menu.id}
            onClick={() => handleClickTabButton(menu)}
          >
            {menu.name}
          </TabButton>
        );
      })}
    </div>
  );
};
