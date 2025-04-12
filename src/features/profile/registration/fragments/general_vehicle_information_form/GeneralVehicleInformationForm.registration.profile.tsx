"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { Textfield } from "@/core/components/textfield";
import {
  RegistrationProfileActionEnum,
  RegistrationProfileContext,
} from "../../context";
import { Dropdownfield } from "@/core/components/dropdownfield";

export const GeneralVehicleInformationFormRegistrationProfile = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(RegistrationProfileContext);

  const handleSelectCarBrand = (data: { id: string; name: string }) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        general: {
          ...state.vehicle_information.general,
          form: {
            ...state.vehicle_information.general.form,
            car_brand: {
              ...state.vehicle_information.general.form.car_brand,
              selected: data,
            },
          },
        },
      },
    });
  };

  const handleChangeCarModel = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        general: {
          ...state.vehicle_information.general,
          form: {
            ...state.vehicle_information.general.form,
            car_model: {
              ...state.vehicle_information.general.form.car_model,
              value: e.currentTarget.value,
            },
          },
        },
      },
    });
  };

  const handleChangeCarColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        general: {
          ...state.vehicle_information.general,
          form: {
            ...state.vehicle_information.general.form,
            car_color: {
              ...state.vehicle_information.general.form.car_color,
              value: e.currentTarget.value,
            },
          },
        },
      },
    });
  };

  const handleChangeLicensePlate = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        general: {
          ...state.vehicle_information.general,
          form: {
            ...state.vehicle_information.general.form,
            license_plate: {
              ...state.vehicle_information.general.form.license_plate,
              value: e.currentTarget.value,
            },
          },
        },
      },
    });
  };

  return (
    <div
      id={dictionaries.vehicle_information.id}
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
        "w-full"
      )}
    >
      <Dropdownfield
        labelProps={{
          ...dictionaries.vehicle_information.general.form.input.car_brand
            .labelProps,
        }}
        inputProps={{
          ...dictionaries.vehicle_information.general.form.input.car_brand
            .inputProps,
        }}
        selected={state.vehicle_information.general.form.car_brand.selected}
        items={state.vehicle_information.general.form.car_brand.items}
        onSelect={handleSelectCarBrand}
      />

      <div
        className={clsx(
          "grid grid-cols-1 md:grid-cols-2 place-content-start place-items-start gap-[0.75rem]",
          "w-full"
        )}
      >
        <Textfield
          labelProps={{
            ...dictionaries.vehicle_information.general.form.input.car_model
              .labelProps,
          }}
          inputProps={{
            ...dictionaries.vehicle_information.general.form.input.car_model
              .inputProps,
            value: state.vehicle_information.general.form.car_model.value,
            onChange: handleChangeCarModel,
          }}
        />
        <Textfield
          labelProps={{
            ...dictionaries.vehicle_information.general.form.input.car_color
              .labelProps,
          }}
          inputProps={{
            ...dictionaries.vehicle_information.general.form.input.car_color
              .inputProps,
            value: state.vehicle_information.general.form.car_color.value,
            onChange: handleChangeCarColor,
          }}
        />
      </div>
      <Textfield
        labelProps={{
          ...dictionaries.vehicle_information.general.form.input.license_plate
            .labelProps,
        }}
        inputProps={{
          ...dictionaries.vehicle_information.general.form.input.license_plate
            .inputProps,
          value: state.vehicle_information.general.form.license_plate.value,
          onChange: handleChangeLicensePlate,
        }}
      />
    </div>
  );
};
