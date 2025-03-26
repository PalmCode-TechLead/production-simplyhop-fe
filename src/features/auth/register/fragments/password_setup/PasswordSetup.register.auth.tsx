"use client";
import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import { getDictionaries } from "../../i18n";
import { Textfield } from "@/core/components/textfield";
import SVGIcon from "@/core/icons";
import { RegisterAuthActionEnum, RegisterAuthContext } from "../../context";
import { Passwordfield } from "@/core/components/passwordfield";
import { Button } from "@/core/components/button";
import { Checkbox } from "@/core/components/checkbox";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants/app";

export const PasswordSetupRegisterAuth = () => {
  const dictionaries = getDictionaries();
  const router = useRouter();
  const { state, dispatch } = React.useContext(RegisterAuthContext);

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
          ...state.password_setup.email,
          value: "",
        },
        confirm_password: {
          ...state.password_setup.email,
          value: "",
        },
        tnc: {
          ...state.password_setup.email,
          checked: false,
        },
      },
    });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: RegisterAuthActionEnum.SetPasswordSetupData,
      payload: {
        ...state.password_setup,
        password: {
          ...state.password_setup.password,
          value: e.currentTarget.value,
        },
      },
    });
  };

  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: RegisterAuthActionEnum.SetPasswordSetupData,
      payload: {
        ...state.password_setup,
        confirm_password: {
          ...state.password_setup.confirm_password,
          value: e.currentTarget.value,
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

  const handleClickRegister = () => {
    router.push(AppCollectionURL.private.profile_registration());
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
        "bg-[white]",
        "px-[3rem] py-[3rem]",
        "rounded-[1.25rem]",
        "max-w-[508px] w-full"
      )}
    >
      <Image
        {...dictionaries.password_setup.form.header.logo}
        alt={dictionaries.password_setup.form.header.logo.alt}
        className={clsx("w-[148px] h-[40px]", "object-center object-cover")}
      />

      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <button className={clsx("cursor-pointer")} onClick={handleClickBack}>
          <SVGIcon
            name="ArrowLeft"
            className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#767676]")}
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
          className={clsx("px-[1rem] py-[0.75rem]")}
          onClick={handleClickRegister}
        >
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
            "grid grid-flow-col place-content-center place-items-center gap-[0.5rem]"
          )}
        >
          <Image
            {...dictionaries.password_setup.form.privacy_policy.credit.logo}
            alt={
              dictionaries.password_setup.form.privacy_policy.credit.logo.alt
            }
            className={clsx("w-[52px] h-[14px]", "object-center object-cover")}
          />
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
