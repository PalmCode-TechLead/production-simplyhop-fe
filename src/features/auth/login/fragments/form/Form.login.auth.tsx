"use client";
import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import { getDictionaries } from "../../i18n";
import { Textfield } from "@/core/components/textfield";
import Link from "next/link";
import SVGIcon, { SVGIconProps } from "@/core/icons";

export const FormLoginAuth = () => {
  const dictionaries = getDictionaries();

  const handleClickLogin = () => {};
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
        "bg-[white]",
        "border border-[#D3E7CE]",
        "px-[3rem] py-[3rem]",
        "rounded-[1.25rem]",
        "max-w-[508px] w-full"
      )}
      style={{
        backdropFilter: "blur(20px)",
        boxShadow: "0px 0px 25px 0px #969C9640",
      }}
    >
      <Image
        {...dictionaries.form.header.logo}
        className={clsx("w-[148px] h-[40px]", "object-center object-cover")}
      />

      <h1 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
        {dictionaries.form.title}
      </h1>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <Textfield
          labelProps={{ ...dictionaries.form.input.email.labelProps }}
          inputProps={{ ...dictionaries.form.input.email.inputProps }}
        />
        <Textfield
          labelProps={{ ...dictionaries.form.input.password.labelProps }}
          inputProps={{ ...dictionaries.form.input.password.inputProps }}
        />

        <button
          className={clsx(
            "flex items-center justify-center",
            "w-full",
            "bg-[#5AC53D]",
            "border border-[#5AC53D]",
            "px-[1rem] py-[0.75rem]",
            "rounded-[0.375rem]",
            "text-[white] text-[0.875rem] font-medium"
          )}
          onClick={handleClickLogin}
        >
          {dictionaries.form.cta.login.children}
        </button>

        {/* NOTES: account */}
        <div className={clsx("flex items-start justify-center", "w-full")}>
          <p
            className={clsx(
              "text-[0.875rem] text-[#232323] font-normal text-center"
            )}
          >
            {dictionaries.form.account.label}
            <Link
              href={dictionaries.form.account.cta.href}
              className={clsx("text-[#5AC53D] font-semibold text-[0.875rem]")}
            >
              <span> {dictionaries.form.account.cta.children}</span>
            </Link>
          </p>
        </div>
      </div>

      {/* NOTES: social media */}
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[0.5rem]",
          "w-full"
        )}
      >
        <p
          className={clsx(
            "text-[0.875rem] text-[#232323] font-normal text-center"
          )}
        >
          {dictionaries.form.social_media.label}
        </p>
        <div
          className={clsx(
            "grid grid-flow-col place-content-center place-items-center gap-[1rem]"
          )}
        >
          {/* bundaran */}
          {dictionaries.form.social_media.items.map((item) => (
            <button
              className={clsx(
                "flex items-center justify-center",
                "w-[2rem] h-[2rem]",
                "rounded-[50%]",
                "border border-[#E9E6E6]",
                "bg-[white]"
              )}
            >
              <SVGIcon
                name={item.icon as SVGIconProps["name"]}
                className={clsx("w-[1.5rem] h-[1.5rem]")}
              />
            </button>
          ))}
        </div>
      </div>

      {/* privacy_policy */}
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1rem]",
          "w-full"
        )}
      >
        <p
          className={clsx(
            "text-[0.75rem] text-[#232323] font-light text-center"
          )}
          dangerouslySetInnerHTML={{
            __html: dictionaries.form.privacy_policy.label,
          }}
        />

        <div
          className={clsx(
            "grid grid-flow-col place-content-center place-items-center gap-[0.5rem]"
          )}
        >
          <Image
            {...dictionaries.form.privacy_policy.credit.logo}
            className={clsx("w-[52px] h-[14px]", "object-center object-cover")}
          />
          <p
            className={clsx(
              "text-[0.75rem] text-[#232323] font-normal text-center"
            )}
            dangerouslySetInnerHTML={{
              __html: dictionaries.form.privacy_policy.credit.message,
            }}
          />
        </div>
      </div>
    </div>
  );
};
