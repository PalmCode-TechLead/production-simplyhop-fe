"use client";
import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import {
  ResetPasswordAuthActionEnum,
  ResetPasswordAuthContext,
} from "../../context";
import { Button } from "@/core/components/button";
import { getError } from "@/core/utils/form";
import { MoonLoader } from "@/core/components/moon_loader";
import { usePostAuthResetPassword } from "../../react_query/hooks";
import { Passwordfield } from "@/core/components/passwordfield";
import SVGIcon from "@/core/icons";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { Checkbox } from "@/core/components/checkbox";

export const FormResetPasswordAuth = () => {
  const router = useRouter();
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(ResetPasswordAuthContext);
  const {
    mutateAsync: postAuthResetPassword,
    isPending: isPendingPostAuthResetPassword,
  } = usePostAuthResetPassword();

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.password.validations.items,
      value: e.currentTarget.value,
    });

    dispatch({
      type: ResetPasswordAuthActionEnum.SetFormData,
      payload: {
        ...state.form,
        password: {
          ...state.form.password,
          value: e.currentTarget.value,
          error: errorItem,
        },
      },
    });
  };

  const handleChangePasswordConfirmation = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const errorObj =
      globalDictionaries.form.confirm_password.validations.items.find(
        (item) => {
          return item.id === "unmatched_password";
        }
      );
    const err = !errorObj
      ? null
      : {
          id: errorObj.id,
          name: errorObj.name,
        };

    dispatch({
      type: ResetPasswordAuthActionEnum.SetFormData,
      payload: {
        ...state.form,
        password_confirmation: {
          ...state.form.password_confirmation,
          value: e.currentTarget.value,
          error:
            state.form.password.value !== e.currentTarget.value ? err : null,
        },
      },
    });
  };

  const handleClickResetPassword = async () => {
    await postAuthResetPassword();
    dispatch({
      type: ResetPasswordAuthActionEnum.SetStateData,
      payload: {
        ...state.state,
        step: "success",
      },
    });
  };

  const handleChangeTNC = () => {
    dispatch({
      type: ResetPasswordAuthActionEnum.SetFormData,
      payload: {
        ...state.form,
        tnc: {
          ...state.form.tnc,
          checked: !state.form.tnc.checked,
        },
      },
    });
  };

  const isSubmitLoading = isPendingPostAuthResetPassword;
  const isPasswordHasNoLength = !state.form.password.value.length;
  const isPasswordInvalid = !!state.form.password.error;
  const isPasswordConfirmationHasNoLength =
    !state.form.password_confirmation.value.length;
  const isPasswordConfirmationInvalid =
    !!state.form.password_confirmation.error;
  const isSubmitDisabled =
    isPendingPostAuthResetPassword ||
    isPasswordHasNoLength ||
    isPasswordInvalid ||
    isPasswordConfirmationHasNoLength ||
    isPasswordConfirmationInvalid ||
    !state.form.tnc.checked;

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
            <button
              aria-label={"schließen"}
              name={"schließen"}
              onClick={handleClickClose}
            >
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
          <Passwordfield
            labelProps={{
              ...dictionaries.form.input.password.labelProps,
            }}
            inputProps={{
              ...dictionaries.form.input.password.inputProps,
              value: state.form.password.value,
              onChange: handleChangePassword,
            }}
            error={state.form.password.error?.name}
          />
          <Passwordfield
            labelProps={{
              ...dictionaries.form.input.password_confirmation.labelProps,
            }}
            inputProps={{
              ...dictionaries.form.input.password_confirmation.inputProps,
              value: state.form.password_confirmation.value,
              onChange: handleChangePasswordConfirmation,
            }}
            error={state.form.password_confirmation.error?.name}
          />
          <div
            className={clsx(
              "grid grid-flow-col place-content-start place-items-start gap-[1rem]",
              "w-full"
            )}
          >
            <Checkbox
              checked={state.form.tnc.checked}
              onChange={handleChangeTNC}
            />
            <p
              className={clsx("text-[0.75rem] text-[#232323] font-light")}
              dangerouslySetInnerHTML={{
                __html: dictionaries.form.input.tnc.label,
              }}
            />
          </div>
        </div>
      </div>

      <Button
        aria-label={dictionaries.form.cta.reset_password.children}
        name={dictionaries.form.cta.reset_password.children}
        className={clsx("px-[1rem] py-[0.75rem]")}
        disabled={isSubmitDisabled}
        isLoading={isSubmitLoading}
        onClick={handleClickResetPassword}
      >
        {isSubmitLoading && <MoonLoader size={20} color={"white"} />}
        {dictionaries.form.cta.reset_password.children}
      </Button>
    </div>
  );
};
