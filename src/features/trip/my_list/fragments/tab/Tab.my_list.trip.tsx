import * as React from "react";
import clsx from "clsx";
import { TabList, Tab, TabGroup } from "@headlessui/react";
import { getDictionaries } from "../../i18n";
import Link from "next/link";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { useSearchParams } from "next/navigation";

export const TabMyListTrip = () => {
  const searchParams = useSearchParams();
  const dictionaries = getDictionaries();

  const type = searchParams.get("type");

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
          "border-b-[0.5px] border-b-[#C2C2C2]",
          "overflow-x-auto"
        )}
      >
        {dictionaries.tab.items.map((item, itemIndex) => {
          const params =
            itemIndex === 0
              ? undefined
              : new URLSearchParams({
                  type: item.id,
                });
          return (
            <Link
              key={itemIndex}
              href={AppCollectionURL.private.myList(
                !params ? params : params.toString()
              )}
            >
              <Tab
                className={clsx(
                  !type && itemIndex === 0
                    ? "text-[#5AC53D] font-semibold border-b-[2px] border-b-[#5AC53D]"
                    : !!type && item.id === type
                    ? "text-[#5AC53D] font-semibold border-b-[2px] border-b-[#5AC53D]"
                    : "text-[#C2C2C2]",
                  "font-normal text-[1rem] ",
                  "outline-none",
                  "cursor-pointer",
                  "whitespace-nowrap"
                )}
              >
                {item.name}
              </Tab>
            </Link>
          );
        })}
      </TabList>
    </TabGroup>
  );
};
