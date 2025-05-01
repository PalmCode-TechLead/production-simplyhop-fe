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
    pageSheet?: PageSheetRouteProps;
  };
  destination?: AutocompleteRoutesProps["destination"] & {
    pageSheet?: PageSheetRouteProps;
  };
}

export const FormRoutes = (props: FormRoutesProps) => {
  const { isLg } = useTailwindBreakpoint();

  if (isLg) {
    return <AutocompleteRoutes {...props} />;
  }
  const { origin, destination, ...restProps } = props;
  return (
    <>
      <AutocompleteRoutes
        {...restProps}
        disabled={origin?.pageSheet?.isOpen || destination?.pageSheet?.isOpen}
        origin={origin}
        destination={destination}
      />
      <PageSheetRoute {...origin?.pageSheet} />
      <PageSheetRoute {...destination?.pageSheet} />
    </>
  );
};
