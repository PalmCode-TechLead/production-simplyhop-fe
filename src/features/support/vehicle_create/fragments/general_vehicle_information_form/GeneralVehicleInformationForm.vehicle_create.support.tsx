"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Textfield } from "@/core/components/textfield";
import {
  VehicleCreateSupportActionEnum,
  VehicleCreateSupportContext,
} from "../../context";
import { Dropdownfield } from "@/core/components/dropdownfield";
import { getError } from "@/core/utils/form";
import {
  useGetVehicleBrandList,
  useGetVehicleCategoryList,
} from "../../react_query/hooks";

export const GeneralVehicleInformationFormVehicleCreateSupport = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(VehicleCreateSupportContext);
  useGetVehicleBrandList();
  useGetVehicleCategoryList();
  const handleSelectCarBrand = (data: { id: string; name: string }) => {
    dispatch({
      type: VehicleCreateSupportActionEnum.SetVehicleInformationData,
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

  const handleSelectCarCategory = (data: { id: string; name: string }) => {
    dispatch({
      type: VehicleCreateSupportActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        general: {
          ...state.vehicle_information.general,
          form: {
            ...state.vehicle_information.general.form,
            car_category: {
              ...state.vehicle_information.general.form.car_category,
              selected: data,
            },
          },
        },
      },
    });
  };

  const handleChangeCarModel = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: VehicleCreateSupportActionEnum.SetVehicleInformationData,
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
      type: VehicleCreateSupportActionEnum.SetVehicleInformationData,
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
    const errorItem = getError({
      errorItems: globalDictionaries.form.email.validations.items,
      value: e.currentTarget.value,
      type: "optional",
    });
    dispatch({
      type: VehicleCreateSupportActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        general: {
          ...state.vehicle_information.general,
          form: {
            ...state.vehicle_information.general.form,
            license_plate: {
              ...state.vehicle_information.general.form.license_plate,
              value: e.currentTarget.value,
              error: errorItem,
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
      <div
        className={clsx(
          "grid grid-cols-1 md:grid-cols-2 place-content-start place-items-start gap-[0.75rem]",
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
        <Dropdownfield
          labelProps={{
            ...dictionaries.vehicle_information.general.form.input.car_category
              .labelProps,
          }}
          inputProps={{
            ...dictionaries.vehicle_information.general.form.input.car_category
              .inputProps,
          }}
          selected={
            state.vehicle_information.general.form.car_category.selected
          }
          items={state.vehicle_information.general.form.car_category.items}
          onSelect={handleSelectCarCategory}
        />
      </div>

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
            value: state.vehicle_information.general.form.car_color.value,
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
        error={state.vehicle_information.general.form.license_plate.error?.name}
      />
    </div>
  );
};
