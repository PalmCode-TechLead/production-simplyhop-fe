"use client";
import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Textfield } from "@/core/components/textfield";
import Link from "next/link";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { RegisterAuthActionEnum, RegisterAuthContext } from "../../context";
import { Button } from "@/core/components/button";
import { getError } from "@/core/utils/form";
import { useGetSocialRedirect } from "../../react_query/hooks";

export const GeneralRegisterAuth = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(RegisterAuthContext);
  const { mutate: getSocialRedirect, isPending: isPendingGetSocialRedirect } =
    useGetSocialRedirect();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.email.validations.items,
      value: e.currentTarget.value,
    });
    dispatch({
      type: RegisterAuthActionEnum.SetGeneralData,
      payload: {
        ...state.general,
        email: {
          ...state.general.email,
          value: e.currentTarget.value,
          error: errorItem,
        },
      },
    });
  };

  const handleClickRegister = () => {
    dispatch({
      type: RegisterAuthActionEnum.SetStateData,
      payload: {
        ...state.state,
        step: "password_setup",
      },
    });
    dispatch({
      type: RegisterAuthActionEnum.SetPasswordSetupData,
      payload: {
        ...state.password_setup,
        email: {
          ...state.password_setup.email,
          value: state.general.email.value,
        },
      },
    });
  };

  const handleClickLoginSocial = (data: { id: string }) => {
    getSocialRedirect({ id: data.id });
  };

  const isEmailHasNoLength = !state.general.email.value.length;
  const isEmailInvalid = !!state.general.email.error;
  const isSubmitDisabled = isEmailHasNoLength || isEmailInvalid;
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
        "bg-[white]",
        "px-[1rem] lg:px-[3rem] py-[3rem]",
        "rounded-[1.25rem]",
        "max-w-[508px] w-full"
      )}
    >
      <div className="w-[148px] h-[40px] flex items-center justify-center">
        <Image
          {...dictionaries.general.form.header.logo}
          alt={dictionaries.general.form.header.logo.alt}
          className="w-[170px] h-[170px] object-contain"
        />
      </div>

      <h1 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
        {dictionaries.general.form.title}
      </h1>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <Textfield
          labelProps={{
            ...dictionaries.general.form.input.email.labelProps,
          }}
          inputProps={{
            ...dictionaries.general.form.input.email.inputProps,
            value: state.general.email.value,
            onChange: handleChangeEmail,
          }}
          error={state.general.email.error?.name}
        />

        <Button
          className={clsx("px-[1rem] py-[0.75rem]")}
          disabled={isSubmitDisabled}
          onClick={handleClickRegister}
        >
          {dictionaries.general.form.cta.register.children}
        </Button>

        {/* NOTES: account */}
        <div className={clsx("flex items-start justify-center", "w-full")}>
          <p
            className={clsx(
              "text-[0.875rem] text-[#232323] font-normal text-center"
            )}
          >
            {dictionaries.general.form.account.label}
            <Link
              href={dictionaries.general.form.account.cta.href}
              className={clsx("text-[#5AC53D] font-semibold text-[0.875rem]")}
            >
              <span> {dictionaries.general.form.account.cta.children}</span>
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
          {dictionaries.general.form.social_media.label}
        </p>
        <div
          className={clsx(
            "grid grid-flow-col place-content-center place-items-center gap-[1rem]"
          )}
        >
          {/* bundaran */}
          {dictionaries.general.form.social_media.items.map(
            (item, itemIndex) => (
              <button
                key={itemIndex}
                className={clsx(
                  "flex items-center justify-center",
                  "w-[2rem] h-[2rem]",
                  "rounded-[50%]",
                  "border border-[#E9E6E6]",
                  "bg-[white]"
                )}
                disabled={isPendingGetSocialRedirect}
                onClick={() => handleClickLoginSocial(item)}
              >
                <SVGIcon
                  name={item.icon as SVGIconProps["name"]}
                  className={clsx("w-[1.5rem] h-[1.5rem]")}
                />
              </button>
            )
          )}
        </div>
      </div>

      {/* privacy_policy */}
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1rem]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-flow-col place-content-center place-items-center gap-[0.5rem]"
          )}
        >
          <div className="w-[52px] h-[14px] flex items-center justify-center">
            <Image
              {...dictionaries.general.form.privacy_policy.credit.logo}
              alt={dictionaries.general.form.privacy_policy.credit.logo.alt}
              className="w-[170px] h-[170px] object-contain"
            />
          </div>

          <p
            className={clsx(
              "text-[0.75rem] text-[#232323] font-normal text-center"
            )}
            dangerouslySetInnerHTML={{
              __html: dictionaries.general.form.privacy_policy.credit.message,
            }}
          />
        </div>
      </div>
    </div>
  );
};
