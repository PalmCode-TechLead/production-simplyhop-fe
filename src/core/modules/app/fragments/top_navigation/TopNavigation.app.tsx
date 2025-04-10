"use client";
import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { TopNavigationDesktopMenu } from "../top_navigation_desktop_menu";
import { TopNavigationMobileMenu } from "../top_navigation_mobile_menu";

export const TopNavigation = () => {
  const dictionaries = getDictionaries();

  const { isLg } = useTailwindBreakpoint();

  return (
    <nav className={clsx("fixed top-0 left-0 right-0", "w-full", "z-30")}>
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center justify-center justify-items-center",
          "w-full h-full",
          "bg-[white]",
          "px-[1rem]"
        )}
        style={{ boxShadow: "0px 5px 10px 0px #0000000D" }}
      >
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-between justify-items-start",
            "max-w-container w-full h-[90px]"
          )}
        >
          {/* NOTES: logo */}
          <Link href={dictionaries.logo.href}>
            <Image
              {...dictionaries.logo.image}
              className={clsx("w-[170px] h-[62px]")}
            />
          </Link>

          {/* NOTES: Menu */}
          {isLg ? <TopNavigationDesktopMenu /> : <TopNavigationMobileMenu />}
        </div>
      </div>
    </nav>
  );
};
