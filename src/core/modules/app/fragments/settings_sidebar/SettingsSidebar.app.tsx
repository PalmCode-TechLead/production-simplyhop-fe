"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { usePathname } from "next/navigation";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import dynamic from "next/dynamic";

const Image = dynamic(() => import("next/image"), {
  ssr: false,
});

const Link = dynamic(() => import("next/link"), {
  ssr: false,
});

const TabButton = dynamic(
  () => import("@/core/components/tab_button").then((mod) => mod.TabButton),
  {
    ssr: false,
  }
);

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
      <React.Suspense fallback={<div />}>
        <div
          className={clsx(
            "flex flex-row-reverse items-end justify-end",
            "lg:grid lg:grid-cols-1 lg:place-content-start lg:place-items-start gap-[0.75rem]",
            "w-full"
          )}
        >
          <h1 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
            {"Kevin Jordi"}
          </h1>
          <Image
            src={"/images/general/default_avatar.jpeg"}
            alt="avatar"
            width={100}
            height={100}
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
            "grid grid-flow-col grid-cols-none lg:grid-flow-row lg:grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full max-w-full",
            "overflow-x-scroll lg:overflow-x-hidden"
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
      </React.Suspense>
    </div>
  );
};
