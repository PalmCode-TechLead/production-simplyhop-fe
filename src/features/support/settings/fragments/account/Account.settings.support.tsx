"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  SettingsSupportActionEnum,
  SettingsSupportContext,
} from "../../context";

export const AccountSettingsSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(SettingsSupportContext);

  const handleClickDeactivateAccount = () => {
    dispatch({
      type: SettingsSupportActionEnum.SetDeactivateData,
      payload: {
        ...state.deactivate,
        is_open: true,
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem] lg:gap-[1.5rem]",
        "w-full",
        "px-[1rem] py-[1rem] lg:px-[1.5rem] lg:py-[1.5rem]",
        "border border-[#D3E7CE]",
        "rounded-[1.25rem]"
      )}
    >
      <h2 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
        {dictionaries.account.title}
      </h2>
      <div
        className={clsx(
          "grid grid-cols-1 lg:grid-flow-col items-center content-center justify-between justify-items-start gap-[0.5rem] lg:gap-[0.25rem]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-between justify-items-start gap-[0.25rem]",
            "w-full"
          )}
        >
          <p className={clsx("text-[#232323CC] text-[1rem] font-medium")}>
            {dictionaries.account.detail.name}
          </p>
          <span className={clsx("text-[#606060] text-[0.875rem] font-normal")}>
            {dictionaries.account.detail.description}
          </span>
        </div>

        <button
          className={clsx(
            "px-[0rem] py-[1rem] lg:px-[1.5rem] lg:py-[1rem]",
            "text-[#B30606] text-[0.875rem] font-medium",
            "cursor-pointer"
          )}
          onClick={handleClickDeactivateAccount}
        >
          {dictionaries.account.cta.deactivate.children}
        </button>
      </div>
    </div>
  );
};
