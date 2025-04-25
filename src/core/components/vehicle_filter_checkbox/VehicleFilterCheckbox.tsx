import * as React from "react";
import clsx from "clsx";
import { Checkbox, CheckboxProps } from "../checkbox";
import { Radio, RadioProps } from "../radio";

export type VehicleFilterOptionProps = CheckboxProps &
  RadioProps & {
    variant?: "checkbox" | "radio";
  };

export const VehicleFilterOption = (props: VehicleFilterOptionProps) => {
  const { label, variant = "checkbox", ...otherProps } = props;
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start",
        "w-full",
        "text-[#232323] text-[0.875rem] font-medium"
      )}
    >
      {label}
      {variant === "checkbox" ? (
        <Checkbox {...otherProps} />
      ) : (
        <Radio {...otherProps} />
      )}
    </div>
  );
};
