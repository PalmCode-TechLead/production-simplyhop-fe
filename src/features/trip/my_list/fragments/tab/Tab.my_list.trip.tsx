import * as React from "react";
import clsx from "clsx";
import { TabList, Tab, TabGroup } from "@headlessui/react";
import { getDictionaries } from "../../i18n";

export const TabMyListTrip = () => {
  const dictionaries = getDictionaries();
  return (
    <TabGroup
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
        "w-full"
      )}
    >
      <TabList
        className={clsx(
          "flex justify-start items-center gap-[2rem]",
          "w-full",
          "border-b-[0.5px] border-b-[#C2C2C2]"
        )}
      >
        {dictionaries.tab.items.map((item, itemIndex) => (
          <Tab
            key={itemIndex}
            className={clsx(
              "text-[#C2C2C2] data-[selected]:text-[#5AC53D] font-normal data-[selected]:font-semibold text-[1rem] ",
              "outline-none",
              "data-[selected]:border-b data-[selected]:border-b-[#5AC53D]",
              "cursor-pointer"
            )}
          >
            {item.name}
          </Tab>
        ))}
      </TabList>
    </TabGroup>
  );
};
