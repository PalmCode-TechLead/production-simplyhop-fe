"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { usePathname } from "next/navigation";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import dynamic from "next/dynamic";
import { UserContext } from "../../context";
import { Avatar } from "@/core/components/avatar";

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
  const { state } = React.useContext(UserContext);
  const dictionaries = getDictionaries();
  const pathname = usePathname();
  const { isLg } = useTailwindBreakpoint();

  const name = `${state.profile.first_name} ${state.profile.last_name}`;

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
            {name}
          </h1>

          <Avatar
            className={clsx("w-[3rem] h-[3rem] lg:w-[100px] lg:h-[100px]")}
            src={state.profile.avatar}
            alt={"profile_picture"}
          />
        </div>

        {/* menu */}
        <div
          className={clsx(
            "grid grid-flow-col grid-cols-none lg:grid-flow-row lg:grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full max-w-full",
            "overflow-x-auto lg:overflow-x-hidden",
            "scrollbar-hide"
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
