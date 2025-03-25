"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  SettingsSupportActionEnum,
  SettingsSupportContext,
} from "../../context";

export const SecuritySettingsSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(SettingsSupportContext);

  const handleClickChangePassword = () => {
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordData,
      payload: {
        ...state.change_password,
        is_open: true,
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full",
        "px-[1.5rem] py-[1.5rem]",
        "border border-[#D3E7CE]",
        "rounded-[1.25rem]"
      )}
    >
      <h2 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
        {dictionaries.security.title}
      </h2>
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[0.25rem]",
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
            {dictionaries.security.detail.name}
          </p>
          <span className={clsx("text-[#606060] text-[0.875rem] font-normal")}>
            {dictionaries.security.detail.description}
          </span>
        </div>

        <button
          className={clsx(
            "px-[1.5rem] py-[1rem]",
            "text-[#5AC53D] text-[0.875rem] font-medium"
          )}
          onClick={handleClickChangePassword}
        >
          {dictionaries.security.cta.change_password.children}
        </button>
      </div>
    </div>
  );
};
