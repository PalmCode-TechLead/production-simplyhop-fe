import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import Link from "next/link";

export const HeaderArchiveTrip = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <Link href={dictionaries.header.cta.back.href}>
          <SVGIcon
            name="ArrowLeft"
            className={clsx("w-[1.5rem] h-[1.5rem]", "text-[black]")}
          />
        </Link>
        <h2 className={clsx("text-[#292929] text-[1rem] font-medium")}>
          {dictionaries.header.subtitle}
        </h2>
      </div>
      <h1 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
        {dictionaries.header.title}
      </h1>
    </div>
  );
};
