import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import * as React from "react";
import {
  AutocompleteRoutes,
  AutocompleteRoutesProps,
} from "../autocomplete_routes";
import { PageSheetRoute, PageSheetRouteProps } from "../page_sheet_route";

export interface FormRoutesProps
  extends Omit<AutocompleteRoutesProps, "origin"> {
  origin?: AutocompleteRoutesProps["origin"] & {
    title?: string;
    isOpen?: boolean;
    onClose?: () => void;
    // kamu juga bisa tambah properti lain di level origin kalau perlu
  };
}

export const FormRoutes = (props: FormRoutesProps) => {
  const { isLg } = useTailwindBreakpoint();

  if (isLg) {
    return <AutocompleteRoutes {...props} />;
  }
  const { origin, ...restProps } = props;
  return (
    <>
      <AutocompleteRoutes {...restProps} origin={origin} />
      <PageSheetRoute
        {...restProps}
        title={origin?.title}
        isOpen={origin?.isOpen}
        onClose={origin?.onClose}
      />
    </>
  );
};
