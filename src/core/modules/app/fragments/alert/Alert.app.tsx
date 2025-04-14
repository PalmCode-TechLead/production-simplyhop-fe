"use client";
import { Alert } from "@/core/components/alert";
import * as React from "react";
import { GlobalContext } from "../../context";
import clsx from "clsx";

export const AlertApp = () => {
  const { state: globalState } = React.useContext(GlobalContext);
  return (
    <div className={clsx("fixed top-[90px]", "z-[2000]")}>
      {globalState.alert.items.map((item, itemIndex) => (
        <Alert key={itemIndex} variant={item.variant} message={item.message} />
      ))}
    </div>
  );
};
