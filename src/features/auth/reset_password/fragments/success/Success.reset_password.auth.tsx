"use client";
import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import { getDictionaries } from "../../i18n";
import { Button } from "@/core/components/button";
import SVGIcon from "@/core/icons";
import Link from "next/link";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const SuccessResetPasswordAuth = () => {
  const dictionaries = getDictionaries();

  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-stretch content-stretch justify-start justify-items-start gap-[2rem]",
        "bg-[white]",
        "px-[1rem] lg:px-[3rem] py-[3rem]",
        "rounded-[1.25rem]",
        "max-w-[508px] w-full min-h-[633px]"
      )}
      style={{
        backdropFilter: "blur(20px)",
        boxShadow: "0px 0px 25px 0px #969C9640",
      }}
    >
      <div
        className={clsx(
          "grid grid-cols-1 justify-start justify-items-start items-start content-start gap-[2rem]",
          "w-full"
        )}
      >
        <div className="w-[148px] h-[40px] flex items-center justify-center">
          <Image
            {...dictionaries.form.header.logo}
            alt={dictionaries.form.header.logo.alt}
            className="w-[170px] h-[170px] object-contain"
          />
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "w-[185px] h-[185px]",
              "rounded-[1.25rem]",
              "bg-[white]",
              "flex items-center justify-center"
            )}
            style={{
              boxShadow: "-6px 16px 56px 0px #A9B1C13D",
            }}
          >
            <SVGIcon
              name="Check"
              className={clsx("w-[7.5rem] h-[7.5rem]", "text-[#33CC33]")}
            />
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 justify-center justify-items-center items-end content-end gap-[3rem]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 justify-center justify-items-center items-end content-end gap-[1rem]",
            "w-full"
          )}
        >
          <h1
            className={clsx(
              "text-[#292929] text-[1.5rem] font-bold text-center"
            )}
          >
            {dictionaries.success.message}
          </h1>

          <p
            className={clsx(
              "text-[#5B5B5B] text-[1rem] font-normal text-center"
            )}
          >
            {dictionaries.success.description}
          </p>
        </div>

        <Link
          aria-label={dictionaries.success.cta.back.children}
          href={AppCollectionURL.public.login()}
          className={clsx("w-full")}
        >
          <Button
            aria-label={dictionaries.success.cta.back.children}
            name={dictionaries.success.cta.back.children}
            className={clsx("px-[1rem] py-[0.75rem]")}
          >
            {dictionaries.success.cta.back.children}
          </Button>
        </Link>
      </div>
    </div>
  );
};
