"use client";
import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Textfield } from "@/core/components/textfield";
import SVGIcon from "@/core/icons";
import { RegisterAuthActionEnum, RegisterAuthContext } from "../../context";
import { Passwordfield } from "@/core/components/passwordfield";
import { Button } from "@/core/components/button";
import { Checkbox } from "@/core/components/checkbox";
import { getError } from "@/core/utils/form";
import { MoonLoader } from "@/core/components/moon_loader";
import { usePostAuthLogin, usePostAuthRegister } from "../../react_query/hooks";

export const PasswordSetupRegisterAuth = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(RegisterAuthContext);
  const {
    mutateAsync: postAuthRegister,
    isPending: isPendingPostAuthRegister,
  } = usePostAuthRegister();
  const { mutateAsync: postAuthLogin, isPending: isPendingPostAuthLogin } =
    usePostAuthLogin();

  const handleClickBack = () => {
    dispatch({
      type: RegisterAuthActionEnum.SetStateData,
      payload: {
        ...state.state,
        step: "general",
      },
    });
    // NOTES: reset data
    dispatch({
      type: RegisterAuthActionEnum.SetPasswordSetupData,
      payload: {
        ...state.password_setup,
        email: {
          ...state.password_setup.email,
          value: "",
        },
        password: {
          ...state.password_setup.password,
          value: "",
        },
        confirm_password: {
          ...state.password_setup.confirm_password,
          value: "",
        },
        tnc: {
          ...state.password_setup.tnc,
          checked: false,
        },
      },
    });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.password.validations.items,
      value: e.currentTarget.value,
    });
    dispatch({
      type: RegisterAuthActionEnum.SetPasswordSetupData,
      payload: {
        ...state.password_setup,
        password: {
          ...state.password_setup.password,
          value: e.currentTarget.value,
          error: errorItem,
        },
      },
    });
  };

  const handleChangeConfirmPassword = (
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
      type: RegisterAuthActionEnum.SetPasswordSetupData,
      payload: {
        ...state.password_setup,
        confirm_password: {
          ...state.password_setup.confirm_password,
          value: e.currentTarget.value,
          error:
            state.password_setup.password.value !== e.currentTarget.value
              ? err
              : null,
        },
      },
    });
  };

  const handleChangeTNC = () => {
    dispatch({
      type: RegisterAuthActionEnum.SetPasswordSetupData,
      payload: {
        ...state.password_setup,
        tnc: {
          ...state.password_setup.tnc,
          checked: !state.password_setup.tnc.checked,
        },
      },
    });
  };

  const handleClickRegister = async () => {
    const register = await postAuthRegister();
    if (!register) return;
    await postAuthLogin();
  };

  const isSubmitLoading = isPendingPostAuthRegister || isPendingPostAuthLogin;

  const isEmailHasNoLength = !state.general.email.value.length;
  const isEmailInvalid = !!state.general.email.error;
  const isPasswordHasNoLength = !state.password_setup.password.value.length;
  const isPasswordInvalid = !!state.password_setup.password.error;
  const isConfirmPasswordHasNoLength =
    !state.password_setup.confirm_password.value.length;
  const isConfirmPasswordInvalid =
    !!state.password_setup.confirm_password.error;
  const isAgreedTNC = state.password_setup.tnc.checked;
  const isSubmitDisabled =
    isEmailHasNoLength ||
    isEmailInvalid ||
    isPasswordHasNoLength ||
    isPasswordInvalid ||
    isConfirmPasswordHasNoLength ||
    isConfirmPasswordInvalid ||
    !isAgreedTNC ||
    isSubmitLoading;

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
      <Image
        {...dictionaries.password_setup.form.header.logo}
        alt={dictionaries.password_setup.form.header.logo.alt}
        className={clsx(
          "fixed top-[1rem] left-[1rem] lg:static",
          "w-[148px] h-[40px]",
          "object-center object-cover"
        )}
      />

      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <button
          aria-label={"Zurück"}
          name={"Zurück"}
          className={clsx("cursor-pointer")}
          onClick={handleClickBack}
        >
          <SVGIcon
            name="ArrowLeft"
            className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B]")}
          />
        </button>

        <h1 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
          {dictionaries.password_setup.form.title}
        </h1>
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <Textfield
          labelProps={{
            ...dictionaries.password_setup.form.input.email.labelProps,
          }}
          inputProps={{
            ...dictionaries.password_setup.form.input.email.inputProps,
            value: state.password_setup.email.value,
          }}
          disabled
        />
        <Passwordfield
          labelProps={{
            ...dictionaries.password_setup.form.input.password.labelProps,
          }}
          inputProps={{
            ...dictionaries.password_setup.form.input.password.inputProps,
            value: state.password_setup.password.value,
            onChange: handleChangePassword,
          }}
          error={state.password_setup.password.error?.name}
        />
        <Passwordfield
          labelProps={{
            ...dictionaries.password_setup.form.input.confirm_password
              .labelProps,
          }}
          inputProps={{
            ...dictionaries.password_setup.form.input.confirm_password
              .inputProps,
            value: state.password_setup.confirm_password.value,
            onChange: handleChangeConfirmPassword,
          }}
          error={state.password_setup.confirm_password.error?.name}
        />

        <div
          className={clsx(
            "grid grid-flow-col place-content-start place-items-start gap-[1rem]",
            "w-full"
          )}
        >
          <Checkbox
            checked={state.password_setup.tnc.checked}
            onChange={handleChangeTNC}
          />
          <p
            className={clsx("text-[0.75rem] text-[#232323] font-light")}
            dangerouslySetInnerHTML={{
              __html: dictionaries.password_setup.form.privacy_policy.label,
            }}
          />
        </div>

        <Button
          aria-label={dictionaries.password_setup.form.cta.register.children}
          name={dictionaries.password_setup.form.cta.register.children}
          className={clsx("px-[1rem] py-[0.75rem]")}
          disabled={isSubmitDisabled}
          isLoading={isSubmitLoading}
          onClick={handleClickRegister}
        >
          {isSubmitLoading && <MoonLoader size={20} color={"white"} />}
          {dictionaries.password_setup.form.cta.register.children}
        </Button>
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
            "grid grid-cols-1 place-content-center place-items-center gap-[0.5rem]"
          )}
        >
          <div className="w-[148px] h-[40px] flex items-center justify-center">
            <Image
              {...dictionaries.password_setup.form.privacy_policy.credit.logo}
              alt={
                dictionaries.password_setup.form.privacy_policy.credit.logo.alt
              }
              className="w-[170px] h-[170px] object-contain"
            />
          </div>
          <p
            className={clsx(
              "text-[0.75rem] text-[#232323] font-normal text-center"
            )}
            dangerouslySetInnerHTML={{
              __html:
                dictionaries.password_setup.form.privacy_policy.credit.message,
            }}
          />
        </div>
      </div>
    </div>
  );
};
