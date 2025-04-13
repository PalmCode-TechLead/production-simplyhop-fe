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
import { Button } from "@/core/components/button";

export const DeactivateNotificationAccountUpdateSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(AccountUpdateSupportContext);
  const isOpen = state.deactivate_notification.is_open;
  const handleClose = () => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateNotificationData,
      payload: {
        ...state.deactivate_notification,
        is_open: false,
      },
    });
  };

  const handleClickGoToHomepage = () => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateNotificationData,
      payload: {
        ...state.deactivate_notification,
        is_open: false,
      },
    });
  };
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
          {dictionaries.deactivate_notification.title}
        </h1>

        <p
          className={clsx("text-[1rem] text-[#888888] font-normal text-center")}
        >
          {dictionaries.deactivate_notification.message}
        </p>

        <Button className={clsx("py-[1rem]")} onClick={handleClickGoToHomepage}>
          {dictionaries.deactivate_notification.cta.go_to_homepage.children}
        </Button>
      </div>
    </Modal>
  );
};
