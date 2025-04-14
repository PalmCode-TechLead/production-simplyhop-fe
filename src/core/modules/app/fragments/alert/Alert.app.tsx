"use client";
import { Alert } from "@/core/components/alert";
import * as React from "react";
import { GlobalActionEnum, GlobalAlert, GlobalContext } from "../../context";
import clsx from "clsx";
import SVGIcon from "@/core/icons";

export const AlertApp = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const handleClickClose = (item: GlobalAlert["items"][0]) => {
    dispatchGlobal({
      type: GlobalActionEnum.SetAlertData,
      payload: {
        ...globalState.alert,
        items: globalState.alert.items.filter(
          (alertItem) => alertItem.id !== item.id
        ),
      },
    });
  };
  return (
    <div className={clsx("fixed top-[90px]", "z-[2000]")}>
      {globalState.alert.items.map((item, itemIndex) => {
        return (
          <Alert
            key={itemIndex}
            variant={item.variant}
            message={item.message}
            cta={
              <button onClick={() => handleClickClose(item)}>
                <SVGIcon
                  name={"X"}
                  className={clsx(
                    "w-[1rem] h-[1rem]",
                    item.variant === "error"
                      ? "text-[#FF0066]"
                      : item.variant === "success"
                      ? "text-[#67A981]"
                      : item.variant === "warning"
                      ? "text-[#DA9D03]"
                      : "text-[#6A6872]"
                  )}
                />
              </button>
            }
          />
        );
      })}
    </div>
  );
};
