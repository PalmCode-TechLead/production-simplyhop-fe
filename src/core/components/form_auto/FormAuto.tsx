import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import * as React from "react";
import { AutocompleteAuto, AutocompleteAutoProps } from "../autocomplete_auto";
import {
  BottomSheetAuto,
  BottomSheetAutoProps,
} from "../bottom_sheet_auto/BottomSheetAuto";

export interface FormAutoProps extends AutocompleteAutoProps {
  bottomSheet?: BottomSheetAutoProps;
}

export const FormAuto = (props: FormAutoProps) => {
  const { isLg } = useTailwindBreakpoint();
  const { bottomSheet, ...restProps } = props;
  if (isLg) {
    return <AutocompleteAuto {...restProps} />;
  }
  return (
    <>
      <AutocompleteAuto {...restProps} disabled={bottomSheet?.isOpen} />
      <BottomSheetAuto {...bottomSheet} />
    </>
  );
};
