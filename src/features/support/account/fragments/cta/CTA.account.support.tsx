'use client'
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { AccountSupportActionEnum, AccountSupportContext } from "../../context";

export const CTAAccountSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(AccountSupportContext);

  const handleClickDeactivate = () => {
    dispatch({
      type: AccountSupportActionEnum.SetDeactivateData,
      payload: {
        ...state.deactivate,
        is_open: true,
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-center justify-items-center",
        "w-full",
        "py-[1rem]"
      )}
    >
      <button
        className={clsx(
          "text-[1rem] text-[#DA2323] font-medium",
          "cursor-pointer"
        )}
        onClick={handleClickDeactivate}
      >
        {dictionaries.cta.deactivate.children}
      </button>
    </div>
  );
};
