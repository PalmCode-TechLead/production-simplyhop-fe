import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { Dropdownfield } from "@/core/components/dropdownfield";
import {
  RegistrationProfileActionEnum,
  RegistrationProfileContext,
} from "../../context";

export const TripVehicleInformationFormRegistrationProfile = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(RegistrationProfileContext);

  const handleSelectSmoking = (data: { id: string; name: string }) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        trip: {
          ...state.vehicle_information.trip,
          form: {
            ...state.vehicle_information.trip.form,
            smoking: {
              ...state.vehicle_information.trip.form.smoking,
              selected: data,
            },
          },
        },
      },
    });
  };

  const handleSelectMusic = (data: { id: string; name: string }) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        trip: {
          ...state.vehicle_information.trip,
          form: {
            ...state.vehicle_information.trip.form,
            music: {
              ...state.vehicle_information.trip.form.music,
              selected: data,
            },
          },
        },
      },
    });
  };

  const handleSelectPet = (data: { id: string; name: string }) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        trip: {
          ...state.vehicle_information.trip,
          form: {
            ...state.vehicle_information.trip.form,
            pet: {
              ...state.vehicle_information.trip.form.pet,
              selected: data,
            },
          },
        },
      },
    });
  };

  const handleSelectChildSeatNumber = (data: { id: string; name: string }) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        trip: {
          ...state.vehicle_information.trip,
          form: {
            ...state.vehicle_information.trip.form,
            child_seat_number: {
              ...state.vehicle_information.trip.form.child_seat_number,
              selected: data,
            },
          },
        },
      },
    });
  };

  const handleSelectFreeSeatNumber = (data: { id: string; name: string }) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        trip: {
          ...state.vehicle_information.trip,
          form: {
            ...state.vehicle_information.trip.form,
            free_seat_number: {
              ...state.vehicle_information.trip.form.free_seat_number,
              selected: data,
            },
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
      <div className={clsx("py-[0.5rem]")}>
        <p className={clsx("text-[0.875rem] text-[#232323CC] font-medium")}>
          {dictionaries.vehicle_information.trip.title}
        </p>
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
          "w-full"
        )}
      >
        <Dropdownfield
          labelProps={{
            ...dictionaries.vehicle_information.trip.form.input.smoking
              .labelProps,
          }}
          inputProps={{
            ...dictionaries.vehicle_information.trip.form.input.smoking
              .inputProps,
          }}
          selected={state.vehicle_information.trip.form.smoking.selected}
          items={state.vehicle_information.trip.form.smoking.items}
          onSelect={handleSelectSmoking}
        />
        <Dropdownfield
          labelProps={{
            ...dictionaries.vehicle_information.trip.form.input.music
              .labelProps,
          }}
          inputProps={{
            ...dictionaries.vehicle_information.trip.form.input.music
              .inputProps,
          }}
          selected={state.vehicle_information.trip.form.music.selected}
          items={state.vehicle_information.trip.form.music.items}
          onSelect={handleSelectMusic}
        />
        <Dropdownfield
          labelProps={{
            ...dictionaries.vehicle_information.trip.form.input.pet.labelProps,
          }}
          inputProps={{
            ...dictionaries.vehicle_information.trip.form.input.pet.inputProps,
          }}
          selected={state.vehicle_information.trip.form.pet.selected}
          items={state.vehicle_information.trip.form.pet.items}
          onSelect={handleSelectPet}
        />

        <div
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[0.75rem]",
            "w-full"
          )}
        >
          <Dropdownfield
            labelProps={{
              ...dictionaries.vehicle_information.trip.form.input
                .child_seat_number.labelProps,
            }}
            inputProps={{
              ...dictionaries.vehicle_information.trip.form.input
                .child_seat_number.inputProps,
            }}
            selected={
              state.vehicle_information.trip.form.child_seat_number.selected
            }
            items={state.vehicle_information.trip.form.child_seat_number.items}
            onSelect={handleSelectChildSeatNumber}
          />
          <Dropdownfield
            labelProps={{
              ...dictionaries.vehicle_information.trip.form.input
                .free_seat_number.labelProps,
            }}
            inputProps={{
              ...dictionaries.vehicle_information.trip.form.input
                .free_seat_number.inputProps,
            }}
            selected={
              state.vehicle_information.trip.form.free_seat_number.selected
            }
            items={state.vehicle_information.trip.form.free_seat_number.items}
            onSelect={handleSelectFreeSeatNumber}
          />
        </div>
      </div>
    </div>
  );
};
