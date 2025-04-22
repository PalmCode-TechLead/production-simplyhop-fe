"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  AccountUpdateSupportActionEnum,
  AccountUpdateSupportContext,
} from "../../context";
import { Button } from "@/core/components/button";
import { usePostUserProfileCreate } from "../../react_query/hooks";

export const CTAAccountUpdateSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(AccountUpdateSupportContext);
  const {
    mutate: postUserProfileCreate,
    isPending: isPendingPostUserProfileCreate,
  } = usePostUserProfileCreate();

  const isSubmitDisabled =
    !!state.form.first_name.error ||
    !!state.form.last_name.error ||
    !!state.form.city.error ||
    !!state.form.phonenumber.error ||
    isPendingPostUserProfileCreate;
  const isSubmitLoading = isPendingPostUserProfileCreate;

  const handleClickSave = () => {
    postUserProfileCreate();
  };

  const handleClickDeactivate = () => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateData,
      payload: {
        ...state.deactivate,
        is_open: true,
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 lg:grid-cols-2 items-start content-start justify-center justify-items-center gap-[1rem]",
        "w-full",
        "py-[1rem]"
      )}
    >
      <button
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-center place-items-center",
          "w-full h-full",
          "text-[1rem] text-[#DA2323] font-medium",
          "cursor-pointer"
        )}
        onClick={handleClickDeactivate}
      >
        {dictionaries.cta.deactivate.children}
      </button>
      <Button
        disabled={isSubmitDisabled}
        isLoading={isSubmitLoading}
        className={clsx("w-full")}
        onClick={handleClickSave}
      >
        {dictionaries.cta.save.children}
      </Button>
    </div>
  );
};
