"use client";
import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";
import { getDictionaries } from "../i18n";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const AGBHelpCenterContainer = () => {
  const dictionaries = getDictionaries();
  const router = useRouter();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
          "w-full"
        )}
      >
        <Link href="" onClick={() => router.back()}>
          <SVGIcon
            name="ArrowLeft"
            className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#767676]")}
          />
        </Link>
        <h1 className={clsx("text-[1.5rem] text-[#292929] font-bold")}>
          {dictionaries.title}
        </h1>
      </div>
      <p
        className={clsx("text-[0.875rem] text-[#606060] font-normal")}
        dangerouslySetInnerHTML={{ __html: dictionaries.content }}
      />
    </div>
  );
};
