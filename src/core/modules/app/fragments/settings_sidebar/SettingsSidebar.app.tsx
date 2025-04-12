"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { TabButton } from "@/core/components/tab_button";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";

export const SettingsSidebarApp = () => {
  const dictionaries = getDictionaries();
  const pathname = usePathname();
  const { isLg } = useTailwindBreakpoint();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      {/* profile */}
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-end justify-items-end direction lg:grid-cols-1 lg:place-content-start lg:place-items-start gap-[0.75rem]",
          "w-full"
        )}
        style={{
          direction: !isLg ? "rtl" : undefined,
        }}
      >
        <h1 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
          {"Kevin Jordi"}
        </h1>
        <Image
          src={"/images/general/default_avatar.jpeg"}
          alt="avatar"
          width={isLg ? 100 : 48}
          height={isLg ? 100 : 48}
          className={clsx(
            "w-[3rem] h-[3rem] lg:w-[100px] lg:h-[100px]",
            "rounded-[50%]",
            "object-center object-cover"
          )}
        />
      </div>

      {/* menu */}
      <div
        className={clsx(
          "grid grid-flow-col lg:grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full max-w-full",
          "overflow-x-scroll"
        )}
      >
        {dictionaries.settings.menu.items.map((menu, index) => {
          return (
            <Link key={index} className={clsx("w-full")} href={menu.href}>
              <TabButton
                selected={pathname.includes(menu.href)}
                variant={isLg ? "vertical" : "horizontal"}
              >
                {menu.name}
              </TabButton>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
