"use client";
import { Modal } from "@/core/components/modal";
import * as React from "react";
import clsx from "clsx";
import {
  AccountUpdateSupportActionEnum,
  AccountUpdateSupportContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { Passwordfield } from "@/core/components/passwordfield";
import { useDeleteDeactivateAccount } from "../../react_query/hooks/useDeleteDeactivateAccount.account_update.support";
import { MoonLoader } from "@/core/components/moon_loader";

export const DeactivateConfirmationAccountUpdateSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(AccountUpdateSupportContext);
  const {
    mutateAsync: deleteDeactivateAccount,
    isPending: isPendingDeleteDeactivateAccount,
  } = useDeleteDeactivateAccount();
  const isOpen = state.deactivate_confirmation.is_open;
  const handleClose = () => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateConfirmationData,
      payload: {
        ...state.deactivate_confirmation,
        is_open: false,
      },
    });
  };

  const handleEnterPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateConfirmationData,
      payload: {
        ...state.deactivate_confirmation,
        form: {
          ...state.deactivate_confirmation.form,
          password: {
            ...state.deactivate_confirmation.form.password,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  const handleClickDeactivateConfirmation = async () => {
    await deleteDeactivateAccount();
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateConfirmationData,
      payload: {
        ...state.deactivate_confirmation,
        is_open: false,
      },
    });
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateNotificationData,
      payload: {
        ...state.deactivate_notification,
        is_open: true,
      },
    });
  };

  const isDeactivateDisabled = isPendingDeleteDeactivateAccount;
  const isDeactivateLoading = isPendingDeleteDeactivateAccount;
  return (
    <Modal
      className={clsx(
        "!max-w-[calc(100vw-3rem)] sm:!max-w-[524px]",
        "h-fit",
        "!rounded-[0.625rem]",
        "overflow-auto",
        "!px-[2rem] !py-[2rem]"
      )}
      open={isOpen}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[2rem]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "flex items-center justify-center",
              "w-[120px] h-[120px]",
              "rounded-[50%]",
              "bg-[#F5F5F5]"
            )}
          >
            <SVGIcon
              name="OctagonX"
              className={clsx("w-[5rem] h-[5rem]", "text-[black]")}
            />
          </div>
        </div>

        <h1
          className={clsx("text-[1.5rem] text-[black] font-bold text-center")}
        >
          {dictionaries.deactivate_confirmation.title}
        </h1>

        <p
          className={clsx("text-[1rem] text-[#888888] font-normal text-center")}
        >
          {dictionaries.deactivate_confirmation.message}
        </p>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
            "w-full"
          )}
        >
          <Passwordfield
            labelProps={{
              ...dictionaries.deactivate_confirmation.form.input.password
                .labelProps,
            }}
            inputProps={{
              ...dictionaries.deactivate_confirmation.form.input.password
                .inputProps,
              value: state.deactivate_confirmation.form.password.value,
              onChange: handleEnterPassword,
            }}
          />
        </div>

        <button
          className={clsx(
            "flex items-center justify-center gap-[0.5rem]",
            "w-full",
            "py-[1rem]",
            "text-[1rem] text-[#C50707] font-medium text-left",
            "cursor-pointer"
          )}
          disabled={isDeactivateDisabled}
          onClick={handleClickDeactivateConfirmation}
        >
          {isDeactivateLoading && <MoonLoader size={20} color={"#C50707"} />}
          {dictionaries.deactivate_confirmation.cta.deactivate.children}
        </button>
      </div>
    </Modal>
  );
};
