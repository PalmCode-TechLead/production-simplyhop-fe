import * as React from "react";
import clsx from "clsx";
import SVGIcon, { SVGIconProps } from "@/core/icons";

export interface SubscriptionItemPaymentSupportProps {
  id?: string;
  name?: string;
  description?: string;
  icon?: SVGIconProps["name"];
  link?: string;
}

export const SubscriptionItemPaymentSupport = ({
  id = "",
  name = "",
  description = "",
  icon = "PieChart",
  link = "",
}: SubscriptionItemPaymentSupportProps) => {
  return (
    <div
      id={id}
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[1rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-start content-start justify-between justify-items-start gap-[1rem]",
          "w-full"
        )}
      >
        <SVGIcon
          name={icon as SVGIconProps["name"]}
          className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#33CC33]")}
        />
        <div
          className={clsx(
            "grid grid-cols-1 items-center content-center justify-between justify-items-start gap-[0.25rem]",
            "w-full"
          )}
        >
          <p className={clsx("text-[0.75rem] text-[#232323] font-normal")}>
            {name}
          </p>
          <p className={clsx("text-[0.75rem] text-[#767676] font-normal")}>
            {description}
          </p>
        </div>
      </div>
      <a href={link} target="_blank">
        <SVGIcon
          name="ArrowUpRight"
          className={clsx("w-[1rem] h-[1rem]", "text-[#33CC33]")}
        />
      </a>
    </div>
  );
};
