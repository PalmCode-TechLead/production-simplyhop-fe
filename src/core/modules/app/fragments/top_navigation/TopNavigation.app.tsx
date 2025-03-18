"use client";
import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { getDictionaries } from "../../i18n";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { usePathname } from "next/navigation";

export const TopNavigation = () => {
  const dictionaries = getDictionaries();
  const pathname = usePathname();
  return (
    <nav
      className={clsx("fixed top-0 left-0 right-0", "h-[90px] w-full", "z-30")}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center justify-center justify-items-center",
          "w-full h-full",
          "bg-[white]"
        )}
      >
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-between justify-items-start",
            "max-w-[1344px] w-full h-full"
          )}
        >
          <Image {...dictionaries.logo} />

          {/* NOTES: menu */}
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-end justify-items-end gap-4 lg:gap-8",
              "w-full"
            )}
          >
            {dictionaries.menu.items.map((menu, menuIndex) => (
              <Link
                {...menu}
                key={menuIndex}
                className={clsx(
                  "grid grid-flow-col place-content-center place-items-center gap-[0.5rem]",
                  pathname === menu.href
                    ? "text-green-500"
                    : "text-neutral-300",
                  "text-[1rem] font-semibold text-inter"
                )}
              >
                <SVGIcon
                  {...(menu.icon as { name: SVGIconProps["name"] })}
                  key={`svgIcon.${menuIndex}`}
                  className={clsx(
                    "w-[1rem] h-[1rem]",
                    pathname === menu.href
                      ? "text-green-500"
                      : "text-neutral-300"
                  )}
                />
                {menu.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
