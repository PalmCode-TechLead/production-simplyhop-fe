"use client";
import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Textfield } from "@/core/components/textfield";
import {
  ForgotPasswordAuthActionEnum,
  ForgotPasswordAuthContext,
} from "../../context";
import { Button } from "@/core/components/button";
import { getError } from "@/core/utils/form";
import { MoonLoader } from "@/core/components/moon_loader";
import { usePostAuthForgotPassword } from "../../react_query/hooks";
import SVGIcon from "@/core/icons";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const FormForgotPasswordAuth = () => {
  const router = useRouter();
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(ForgotPasswordAuthContext);
  const {
    mutateAsync: postAuthForgotPassword,
    isPending: isPendingPostAuthForgotPassword,
  } = usePostAuthForgotPassword();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.email.validations.items,
      value: e.currentTarget.value,
    });

    dispatch({
      type: ForgotPasswordAuthActionEnum.SetFormData,
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

  const handleClickForgotPassword = async () => {
    const res = await postAuthForgotPassword();
    if (!res) return;
    dispatch({
      type: ForgotPasswordAuthActionEnum.SetStateData,
      payload: {
        ...state.state,
        step: "success",
      },
    });
  };

  const isSubmitLoading = isPendingPostAuthForgotPassword;
  const isEmailHasNoLength = !state.form.email.value.length;
  const isEmailInvalid = !!state.form.email.error;
  const isPasswordHasNoLength = !state.form.email.value.length;
  const isSubmitDisabled =
    isPendingPostAuthForgotPassword ||
    isEmailHasNoLength ||
    isEmailInvalid ||
    isPasswordHasNoLength;

  const handleClickClose = () => {
    router.push(AppCollectionURL.public.login());
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-stretch content-between justify-start justify-items-start gap-[2rem]",
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
          "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
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
            "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
              "w-full"
            )}
          >
            <button onClick={handleClickClose}>
              <SVGIcon
                name="X"
                className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#767676]")}
              />
            </button>
            <h1 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
              {dictionaries.form.title}
            </h1>
          </div>

          <p className={clsx("text-[#888888] text-[0.875rem] font-normal")}>
            {dictionaries.form.description}
          </p>
        </div>
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
        </div>
      </div>

      <Button
        className={clsx("px-[1rem] py-[0.75rem]")}
        disabled={isSubmitDisabled}
        isLoading={isSubmitLoading}
        onClick={handleClickForgotPassword}
      >
        {isSubmitLoading && <MoonLoader size={20} color={"white"} />}
        {dictionaries.form.cta.forgot_password.children}
      </Button>
    </div>
  );
};
