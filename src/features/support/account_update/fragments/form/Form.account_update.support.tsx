"use client";
import * as React from "react";
import clsx from "clsx";
import { Textfield } from "@/core/components/textfield";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Textareafield } from "@/core/components/textareafield";
import {
  AccountUpdateSupportActionEnum,
  AccountUpdateSupportContext,
} from "../../context";
import { UserContext } from "@/core/modules/app/context";
import { getError } from "@/core/utils/form";

export const FormAccountUpdateSupport = () => {
  const globalDictionaries = getGlobalDictionaries();
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(AccountUpdateSupportContext);

  React.useEffect(() => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,

        first_name: {
          ...state.form.first_name,
          value: userState.profile.first_name,
        },
        last_name: {
          ...state.form.last_name,
          value: userState.profile.last_name,
        },
        city: {
          ...state.form.city,
          value: userState.profile.city,
        },
        phonenumber: {
          ...state.form.phonenumber,
          value: userState.profile.phonenumber,
        },
        about_me: {
          ...state.form.about_me,
          value: userState.profile.about_me,
        },
      },
    });
  }, [
    userState.profile.first_name,
    userState.profile.last_name,
    userState.profile.city,
    userState.profile.phonenumber,
    userState.profile.about_me,
  ]);

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.first_name.validations.items,
      value: e.currentTarget.value,
      type: "optional",
    });
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,

        first_name: {
          ...state.form.first_name,
          value: e.currentTarget.value,
          error: errorItem,
        },
      },
    });
  };

  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.last_name.validations.items,
      value: e.currentTarget.value,
      type: "optional",
    });
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,

        last_name: {
          ...state.form.last_name,
          value: e.currentTarget.value,
          error: errorItem,
        },
      },
    });
  };

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.city.validations.items,
      value: e.currentTarget.value,
      type: "optional",
    });
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,
        city: {
          ...state.form.city,
          value: e.currentTarget.value,
          error: errorItem,
        },
      },
    });
  };

  const handleChangePhonenumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.phonenumber.validations.items,
      value: e.currentTarget.value,
      type: "optional",
    });
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,
        phonenumber: {
          ...state.form.phonenumber,
          value: e.currentTarget.value,
          error: errorItem,
        },
      },
    });
  };

  const handleChangeAboutMe = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,
        about_me: {
          ...state.form.about_me,
          value: e.currentTarget.value,
        },
      },
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full",
        "px-[1.5rem] py-[1.5rem]",
        "relative",
        "border border-[#D3E7CE]",
        "rounded-[1.25rem]"
      )}
    >
      <h1 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
        {dictionaries.title}
      </h1>
      <Textfield
        labelProps={{ ...dictionaries.form.input.email.labelProps }}
        inputProps={{
          ...dictionaries.form.input.email.inputProps,
          value: userState.profile.email,
        }}
        disabled
      />
      <div
        className={clsx(
          "grid grid-cols-2 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        <Textfield
          labelProps={{ ...dictionaries.form.input.first_name.labelProps }}
          inputProps={{
            ...dictionaries.form.input.first_name.inputProps,
            value: state.form.first_name.value,
            onChange: handleChangeFirstName,
          }}
          error={state.form.first_name.error?.name}
        />
        <Textfield
          labelProps={{ ...dictionaries.form.input.last_name.labelProps }}
          inputProps={{
            ...dictionaries.form.input.last_name.inputProps,
            value: state.form.last_name.value,
            onChange: handleChangeLastName,
          }}
          error={state.form.last_name.error?.name}
        />
      </div>
      <Textfield
        labelProps={{ ...dictionaries.form.input.city.labelProps }}
        inputProps={{
          ...dictionaries.form.input.city.inputProps,
          value: state.form.city.value,
          onChange: handleChangeCity,
        }}
        error={state.form.city.error?.name}
      />
      <Textfield
        labelProps={{ ...dictionaries.form.input.phonenumber.labelProps }}
        inputProps={{
          ...dictionaries.form.input.phonenumber.inputProps,
          value: state.form.phonenumber.value,
          onChange: handleChangePhonenumber,
        }}
        error={state.form.phonenumber.error?.name}
      />
      <Textareafield
        labelProps={{ ...dictionaries.form.input.about_me.labelProps }}
        inputProps={{
          ...dictionaries.form.input.about_me.inputProps,
          value: state.form.about_me.value,
          onChange: handleChangeAboutMe,
        }}
      />
    </div>
  );
};
