"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { HeaderHelpCenter } from "@/core/components/header_help_center";

export const DatenschutzHelpCenterContainer = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <HeaderHelpCenter title={dictionaries.title} />
      <p
        className={clsx("text-[0.875rem] text-[#606060] font-normal")}
        dangerouslySetInnerHTML={{ __html: dictionaries.content }}
      />
    </div>
  );
};
