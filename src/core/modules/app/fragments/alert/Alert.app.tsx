"use client";
import { Alert } from "@/core/components/alert";
import * as React from "react";
import { GlobalActionEnum, GlobalAlert, GlobalContext } from "../../context";
import clsx from "clsx";
import SVGIcon from "@/core/icons";
import { createPortal } from "react-dom";

export const AlertApp = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  if (!mounted) return null;
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

  return createPortal(
    <div
      id="alert-portal"
      className={clsx(
        "fixed top-[20px] left-[50%] translate-x-[-50%]",
        "z-[100000]",
        "grid grid-cols-1 place-content-center place-items-center gap-[0.5rem]"
      )}
    >
      {globalState.alert.items.map((item, itemIndex) => {
        return (
          <Alert
            key={itemIndex}
            variant={item.variant}
            message={item.message}
            cta={{
              children: (
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
              ),
              onClick: () => handleClickClose(item),
            }}
          />
        );
      })}
    </div>,
    document.body
  );
};
