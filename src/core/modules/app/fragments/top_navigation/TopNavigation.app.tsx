"use client";
import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { getDictionaries } from "../../i18n";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { usePathname } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import Cookie from "universal-cookie";

export const TopNavigation = () => {
  const dictionaries = getDictionaries();
  const pathname = usePathname();
  const cookie = new Cookie();
  const token = cookie.get("token");
  const isLogin = !!token;

  return (
    <nav className={clsx("fixed top-0 left-0 right-0", "w-full", "z-30")}>
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center justify-center justify-items-center",
          "w-full h-full",
          "bg-[white]"
        )}
        style={{ boxShadow: "0px 5px 10px 0px #0000000D" }}
      >
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-between justify-items-start",
            "max-w-container w-full h-full"
          )}
        >
          {/* NOTES: logo */}
          <Link href={dictionaries.logo.href}>
            <Image
              {...dictionaries.logo.image}
              className={clsx("w-[170px] h-[62px]")}
            />
          </Link>

          {/* NOTES: menu */}
          <div
            className={clsx(
              "grid grid-rows-1 grid-flow-col items-center content-center justify-end justify-items-end gap-4 lg:gap-8",
              "w-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-flow-col items-center content-center justify-end justify-items-end gap-4 lg:gap-8",
                "w-full h-full"
              )}
            >
              {dictionaries.menu.items.map((menu, menuIndex) => (
                <Link
                  {...menu}
                  href={
                    menu.id === "mitfahrt-anbieten" && !isLogin
                      ? AppCollectionURL.public.login()
                      : menu.id === "support" && !isLogin
                      ? AppCollectionURL.public.login()
                      : menu.href
                  }
                  key={menuIndex}
                  className={clsx(
                    "grid grid-flow-col place-content-center place-items-center gap-[0.5rem]",
                    "h-[90px]",

                    pathname === menu.href && menu.id === "mitfahrt-anbieten"
                      ? "text-[#333FFF]"
                      : pathname === menu.href
                      ? "text-green-500"
                      : pathname.includes(menu.id)
                      ? "text-green-500"
                      : "text-neutral-300",
                    "text-[1rem] font-semibold text-inter",
                    pathname === menu.href && menu.id === "mitfahrt-anbieten"
                      ? "border-b-[0.25rem] border-b-[#333FFF]"
                      : pathname === menu.href
                      ? "border-b-[0.25rem] border-b-green-500"
                      : pathname.includes(menu.id)
                      ? "border-b-[0.25rem] border-b-green-500"
                      : "border-b-[0.25rem] border-b-white"
                  )}
                >
                  <SVGIcon
                    {...(menu.icon as { name: SVGIconProps["name"] })}
                    key={`svgIcon.${menuIndex}`}
                    className={clsx(
                      "w-[1rem] h-[1rem]",
                      pathname === menu.href && menu.id === "mitfahrt-anbieten"
                        ? "text-[#333FFF]"
                        : pathname === menu.href
                        ? "text-green-500"
                        : pathname.includes(menu.id)
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
      </div>
    </nav>
  );
};
