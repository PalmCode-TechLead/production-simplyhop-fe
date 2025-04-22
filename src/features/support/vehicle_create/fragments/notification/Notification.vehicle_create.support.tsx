"use client";
import { Modal } from "@/core/components/modal";
import * as React from "react";
import clsx from "clsx";
import {
  VehicleCreateSupportActionEnum,
  VehicleCreateSupportContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { Button } from "@/core/components/button";

export const NotificationVehicleCreateSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(VehicleCreateSupportContext);
  const isOpen = state.notification.is_open;
  const handleClose = () => {
    dispatch({
      type: VehicleCreateSupportActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: false,
      },
    });
  };

  const handleClickGoToHomepage = () => {
    dispatch({
      type: VehicleCreateSupportActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
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
              "bg-[#EFF9EC]"
            )}
          >
            <SVGIcon
              name="ContrastCheckMark"
              className={clsx("w-[5rem] h-[5rem]", "text-[#5AC53D]")}
            />
          </div>
        </div>

        <h1
          className={clsx("text-[1.5rem] text-[black] font-bold text-center")}
        >
          {dictionaries.notification.title}
        </h1>

        <div className={clsx("w-full h-[1.25rem]")} />

        <Button className={clsx("py-[1rem]")} onClick={handleClickGoToHomepage}>
          {dictionaries.notification.cta.back.children}
        </Button>
      </div>
    </Modal>
  );
};
