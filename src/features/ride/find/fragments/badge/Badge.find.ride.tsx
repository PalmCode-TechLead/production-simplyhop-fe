import * as React from "react";
import clsx from "clsx";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { getDictionaries } from "../../i18n";

export const BadgeFindRide = () => {
  const dictionaries = getDictionaries();

  return (
    <div
      className={clsx(
        "grid grid-flow-col place-items-center place-content-center gap-4",
        "bg-green-500",
        "rounded-[1.25rem]",
        "px-4 py-4",
        "text-xl text-neutral-50 font-bold",
        "w-fit",
        "absolute top-[1.5rem]"
      )}
    >
      <SVGIcon
        {...(dictionaries.top_badge.icon as { name: SVGIconProps["name"] })}
        className={clsx("w-6 h-6", "text-neutral-50")}
      />
      {dictionaries.top_badge.label}
    </div>
  );
};
