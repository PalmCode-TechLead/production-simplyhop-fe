"use client";
import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Textfield } from "@/core/components/textfield";
import Link from "next/link";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { LoginAuthActionEnum, LoginAuthContext } from "../../context";
import { Button } from "@/core/components/button";
import { Passwordfield } from "@/core/components/passwordfield";
import { getError } from "@/core/utils/form";
import { MoonLoader } from "@/core/components/moon_loader";
import {
  useGetSocialRedirect,
  usePostAuthLogin,
} from "../../react_query/hooks";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const FormLoginAuth = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(LoginAuthContext);
  const { mutate: postAuthLogin, isPending: isPendingPostAuthLogin } =
    usePostAuthLogin();
  const { mutate: getSocialRedirect, isPending: isPendingGetSocialRedirect } =
    useGetSocialRedirect();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.email.validations.items,
      value: e.currentTarget.value,
    });

    dispatch({
      type: LoginAuthActionEnum.SetFormData,
      payload: {
        ...state.form,
        email: {
          ...state.form.email,
          value: e.currentTarget.value,
          error: errorItem,
        },
      },
    });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: LoginAuthActionEnum.SetFormData,
      payload: {
        ...state.form,
        password: {
          ...state.form.password,
          value: e.currentTarget.value,
        },
      },
    });
  };

  const handleClickLoginSocial = (data: { id: string }) => {
    getSocialRedirect({ id: data.id });
  };

  const handleClickLogin = async () => {
    postAuthLogin();
  };

  const isSubmitLoading = isPendingPostAuthLogin;
  const isEmailHasNoLength = !state.form.email.value.length;
  const isEmailInvalid = !!state.form.email.error;
  const isPasswordHasNoLength = !state.form.password.value.length;
  const isSubmitDisabled =
    isPendingPostAuthLogin ||
    isEmailHasNoLength ||
    isEmailInvalid ||
    isPasswordHasNoLength;

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
          {...dictionaries.form.header.logo}
          alt={dictionaries.form.header.logo.alt}
          className="w-[170px] h-[170px] object-contain"
        />
      </div>

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
          inputProps={{
            ...dictionaries.form.input.email.inputProps,
            value: state.form.email.value,
            onChange: handleChangeEmail,
          }}
          error={state.form.email.error?.name}
        />
        <Passwordfield
          labelProps={{ ...dictionaries.form.input.password.labelProps }}
          inputProps={{
            ...dictionaries.form.input.password.inputProps,
            value: state.form.password.value,
            onChange: handleChangePassword,
          }}
          error={state.form.password.error?.name}
          helper={
            <Link
              href={AppCollectionURL.public.forgot_password()}
              className={clsx("text-[0.625rem] text-[#5B5B5B] font-normal")}
            >
              {"Passwort vergessen?"}
            </Link>
          }
        />

        <Button
          className={clsx("px-[1rem] py-[0.75rem]")}
          disabled={isSubmitDisabled}
          isLoading={isSubmitLoading}
          onClick={handleClickLogin}
        >
          {isSubmitLoading && <MoonLoader size={20} color={"white"} />}
          {dictionaries.form.cta.login.children}
        </Button>

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
          {dictionaries.form.social_media.items.map((item, itemIndex) => (
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
            "grid grid-cols-1 place-content-center place-items-center gap-[0.5rem]"
          )}
        >
          <div className="w-[148px] h-[40px] flex items-center justify-center">
            <Image
              {...dictionaries.form.header.logo}
              alt={dictionaries.form.header.logo.alt}
              className="w-[170px] h-[170px] object-contain"
            />
          </div>
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
