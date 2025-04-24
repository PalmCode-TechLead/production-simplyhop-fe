import * as React from "react";
import clsx from "clsx";
import { Checkbox, CheckboxProps } from "../checkbox";

export type VehicleFilterCheckboxProps = CheckboxProps;

export const VehicleFilterCheckbox = (props: VehicleFilterCheckboxProps) => {
  const { label, ...otherProps } = props;
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start",
        "w-full",
        "text-[#232323] text-[0.875rem] font-medium"
      )}
    >
      {label}

      <Checkbox {...otherProps} />
    </div>
  );
};
