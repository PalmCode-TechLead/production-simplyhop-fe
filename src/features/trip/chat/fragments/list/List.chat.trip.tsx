import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { SearchField } from "@/core/components/searchfield";

export interface ListChatTripProps {}

export const ListChatTrip = (props: ListChatTripProps) => {
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
        "w-full"
      )}
    >
      <h1 className={clsx("text-[black] text-[1.5rem] font-semibold")}>
        {dictionaries.title}
      </h1>

      {/* Search */}
      <SearchField
        labelProps={{ ...dictionaries.search.labelProps }}
        inputProps={{ ...dictionaries.search.inputProps }}
      />
      {/* Tab */}
      <div></div>
    </div>
  );
};
