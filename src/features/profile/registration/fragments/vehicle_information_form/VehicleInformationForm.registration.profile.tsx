"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { Textfield } from "@/core/components/textfield";
import {
  RegistrationProfileActionEnum,
  RegistrationProfileContext,
} from "../../context";

export const VehicleInformationFormRegistrationProfile = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(RegistrationProfileContext);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetPersonalInformationData,
      payload: {
        ...state.personal_information,
        form: {
          ...state.personal_information.form,
          email: {
            ...state.personal_information.form.email,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetPersonalInformationData,
      payload: {
        ...state.personal_information,
        form: {
          ...state.personal_information.form,
          first_name: {
            ...state.personal_information.form.first_name,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetPersonalInformationData,
      payload: {
        ...state.personal_information,
        form: {
          ...state.personal_information.form,
          last_name: {
            ...state.personal_information.form.last_name,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  const handleChangePhonenumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetPersonalInformationData,
      payload: {
        ...state.personal_information,
        form: {
          ...state.personal_information.form,
          phonenumber: {
            ...state.personal_information.form.phonenumber,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <h2 className={clsx("text-[1.5rem] text-[#292929] font-bold")}>
        {dictionaries.vehicle_information.title}
      </h2>
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
            value: state.personal_information.form.email.value,
            onChange: handleChangeEmail,
          }}
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
          />
        </div>
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
        />
      </div>
    </div>
  );
};
