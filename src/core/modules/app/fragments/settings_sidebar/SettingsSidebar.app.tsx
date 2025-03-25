"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { TabButton } from "@/core/components/tab_button";

export const SettingsSidebarApp = () => {
  const dictionaries = getDictionaries();
  const pathname = usePathname();
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
          "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
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
            "w-[100px] h-[100px]",
            "rounded-[50%]",
            "object-center object-cover"
          )}
        />
      </div>

      {/* menu */}
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        {dictionaries.settings.menu.items.map((menu, index) => {
          return (
            <Link key={index} className={clsx("w-full")} href={menu.href}>
              <TabButton selected={pathname.includes(menu.href)}>
                {menu.name}
              </TabButton>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
