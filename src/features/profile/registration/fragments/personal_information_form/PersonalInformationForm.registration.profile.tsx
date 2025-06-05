"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Textfield } from "@/core/components/textfield";
import {
  RegistrationProfileActionEnum,
  RegistrationProfileContext,
} from "../../context";
import { getError } from "@/core/utils/form";
import { Textareafield } from "@/core/components/textareafield";
import { Dropdownfield } from "@/core/components/dropdownfield";
import { UserContext } from "@/core/modules/app/context";

export const PersonalInformationFormRegistrationProfile = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(RegistrationProfileContext);

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.first_name.validations.items,
      value: e.currentTarget.value,
      type: "required",
    });
    dispatch({
      type: RegistrationProfileActionEnum.SetPersonalInformationData,
      payload: {
        ...state.personal_information,
        form: {
          ...state.personal_information.form,
          first_name: {
            ...state.personal_information.form.first_name,
            value: e.currentTarget.value,
            error: errorItem,
          },
        },
      },
    });
  };

  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.last_name.validations.items,
      value: e.currentTarget.value,
      type: "required",
    });
    dispatch({
      type: RegistrationProfileActionEnum.SetPersonalInformationData,
      payload: {
        ...state.personal_information,
        form: {
          ...state.personal_information.form,
          last_name: {
            ...state.personal_information.form.last_name,
            value: e.currentTarget.value,
            error: errorItem,
          },
        },
      },
    });
  };

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const errorItem = getError({
    //   errorItems: globalDictionaries.form.city.validations.items,
    //   value: e.currentTarget.value,
    //   type: "optional",
    // });
    dispatch({
      type: RegistrationProfileActionEnum.SetPersonalInformationData,
      payload: {
        ...state.personal_information,
        form: {
          ...state.personal_information.form,
          city: {
            ...state.personal_information.form.city,
            value: e.currentTarget.value,
            // error: errorItem,
          },
        },
      },
    });
  };

  const handleChangePhonenumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.phonenumber.validations.items,
      value: e.currentTarget.value,
      type: "required",
    });
    dispatch({
      type: RegistrationProfileActionEnum.SetPersonalInformationData,
      payload: {
        ...state.personal_information,
        form: {
          ...state.personal_information.form,
          phonenumber: {
            ...state.personal_information.form.phonenumber,
            value: e.currentTarget.value,
            error: errorItem,
          },
        },
      },
    });
  };

  const handleSelectGender = (data: { id: string; name: string }) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetPersonalInformationData,
      payload: {
        ...state.personal_information,
        form: {
          ...state.personal_information.form,
          gender: {
            ...state.personal_information.form.gender,
            selected: data,
          },
        },
      },
    });
  };

  const handleChangeAboutMe = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetPersonalInformationData,
      payload: {
        ...state.personal_information,
        form: {
          ...state.personal_information.form,
          about_me: {
            ...state.personal_information.form.about_me,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
        "w-full"
      )}
    >
      <Textfield
        labelProps={{
          ...dictionaries.personal_information.form.input.email.labelProps,
        }}
        inputProps={{
          ...dictionaries.personal_information.form.input.email.inputProps,
          value: !userState.profile?.email.length
            ? "-"
            : userState.profile.email,
        }}
        disabled
      />

      <div
        className={clsx(
          "grid grid-cols-1 md:grid-cols-2 place-content-start place-items-start gap-[0.75rem]",
          "w-full"
        )}
      >
        <Textfield
          labelProps={{
            ...dictionaries.personal_information.form.input.first_name
              .labelProps,
          }}
          inputProps={{
            ...dictionaries.personal_information.form.input.first_name
              .inputProps,
            value: state.personal_information.form.first_name.value,
            onChange: handleChangeFirstName,
          }}
          error={state.personal_information.form.first_name.error?.name}
        />
        <Textfield
          labelProps={{
            ...dictionaries.personal_information.form.input.last_name
              .labelProps,
          }}
          inputProps={{
            ...dictionaries.personal_information.form.input.last_name
              .inputProps,
            value: state.personal_information.form.last_name.value,
            onChange: handleChangeLastName,
          }}
          error={state.personal_information.form.last_name.error?.name}
        />
      </div>
      <Dropdownfield
        labelProps={{
          ...dictionaries.personal_information.form.input.gender.labelProps,
        }}
        inputProps={{
          ...dictionaries.personal_information.form.input.gender.inputProps,
        }}
        selected={state.personal_information.form.gender.selected}
        items={globalDictionaries.personal_information.gender.options.items}
        onSelect={handleSelectGender}
      />
      <div
        className={clsx(
          "grid grid-cols-1 md:grid-cols-2 place-content-start place-items-start gap-[0.75rem]",
          "w-full"
        )}
      >
        <Textfield
          labelProps={{
            ...dictionaries.personal_information.form.input.city.labelProps,
          }}
          inputProps={{
            ...dictionaries.personal_information.form.input.city.inputProps,
            value: state.personal_information.form.city.value,
            onChange: handleChangeCity,
          }}
          error={state.personal_information.form.city.error?.name}
        />
        <Textfield
          labelProps={{
            ...dictionaries.personal_information.form.input.phonenumber
              .labelProps,
          }}
          inputProps={{
            ...dictionaries.personal_information.form.input.phonenumber
              .inputProps,
            value: state.personal_information.form.phonenumber.value,
            onChange: handleChangePhonenumber,
          }}
          error={state.personal_information.form.phonenumber.error?.name}
        />
      </div>

      <Textareafield
        labelProps={{
          ...dictionaries.personal_information.form.input.about_me.labelProps,
        }}
        inputProps={{
          ...dictionaries.personal_information.form.input.about_me.inputProps,
          value: state.personal_information.form.about_me.value,
          onChange: handleChangeAboutMe,
        }}
      />
    </div>
  );
};
