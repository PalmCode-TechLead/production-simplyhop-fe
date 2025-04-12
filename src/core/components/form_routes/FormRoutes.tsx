import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import * as React from "react";
import {
  AutocompleteRoutes,
  AutocompleteRoutesProps,
} from "../autocomplete_routes";
import { BottomSheetRoute } from "../bottom_sheet_route";

export type FormRoutesProps = AutocompleteRoutesProps;

export const FormRoutes = (props: FormRoutesProps) => {
  const { isLg } = useTailwindBreakpoint();
  if (!isLg) {
    return <AutocompleteRoutes {...props} />;
  }
  return (
    <>
      <AutocompleteRoutes {...props} />
      {/* <BottomSheetRoute
        isOpen={state.filters.origin.bottom_sheet.is_open}
        title={dictionaries.filter.form.origin.title}
        inputProps={{ ...dictionaries.filter.form.origin.inputProps }}
        labelProps={{ ...dictionaries.filter.form.origin.labelProps }}
        selected={state.filters.origin.selected.item}
        items={state.filters.origin.items}
        onQuery={(data: string) => handleQueryOriginRoutes(data)}
        onSelect={(data: { id: string; name: string }) => {
          handleSelectOriginRoutes(data);
        }}
        onClose={handleCloseOriginRoutes}
      />

      <BottomSheetRoute
        isOpen={state.filters.destination.bottom_sheet.is_open}
        title={dictionaries.filter.form.destination.title}
        inputProps={{ ...dictionaries.filter.form.destination.inputProps }}
        labelProps={{ ...dictionaries.filter.form.destination.labelProps }}
        selected={state.filters.destination.selected.item}
        items={state.filters.destination.items}
        onQuery={(data: string) => handleQueryDestinationRoutes(data)}
        onSelect={(data: { id: string; name: string }) => {
          handleSelectDestinationRoutes(data);
        }}
        onClose={handleCloseDestinationRoutes}
      /> */}
    </>
  );
};
