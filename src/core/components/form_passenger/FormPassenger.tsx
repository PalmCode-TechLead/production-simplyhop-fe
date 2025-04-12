import * as React from "react";
import {
  DropdownPassenger,
  DropdownPassengerProps,
} from "../dropdown_passenger";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";

export type FormPassengerProps = DropdownPassengerProps;

export const FormPassenger = (props: FormPassengerProps) => {
  const { isLg } = useTailwindBreakpoint();
  if (!isLg) {
    return <DropdownPassenger {...props} />;
  }
  return <DropdownPassenger {...props} />;
};
