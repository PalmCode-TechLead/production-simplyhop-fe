import { useEffect, useState } from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import Link from "next/link";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import Cookies from "universal-cookie";
import { usePathname } from "next/navigation";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { motion, AnimatePresence } from "framer-motion";

export const TopNavigationMobileMenu = () => {
  const dictionaries = getDictionaries();
  const cookie = new Cookies();
  const token = cookie.get("token");
  const isLogin = !!token;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickDropdownButton = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const variants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };
  return (
    <>
      <button
        className={clsx("cursor-pointer")}
        onClick={handleClickDropdownButton}
      >
        <SVGIcon
          name={isOpen ? "X" : "Menu"}
          className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#767676]")}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={clsx(
              "grid grid-rows-1 grid-cols-1 items-center content-center justify-end justify-items-end gap-4 lg:gap-8",
              "fixed top-[90px] left-0 right-0",
              "w-full z-30 bg-white px-[1rem]"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 items-center content-center justify-end justify-items-end gap-4 lg:gap-8",
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
                    "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
                    "h-[2.5rem]",
                    "w-full",

                    pathname === menu.href && menu.id === "mitfahrt-anbieten"
                      ? "text-[#333FFF]"
                      : pathname === menu.href
                      ? "text-green-500"
                      : pathname.includes(menu.id)
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
