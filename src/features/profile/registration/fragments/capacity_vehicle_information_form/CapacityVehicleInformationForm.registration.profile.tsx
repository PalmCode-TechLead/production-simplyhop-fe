import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { Dropdownfield } from "@/core/components/dropdownfield";
import {
  RegistrationProfileActionEnum,
  RegistrationProfileContext,
} from "../../context";

export const CapacityVehicleInformationFormRegistrationProfile = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(RegistrationProfileContext);

  const handleSelectAvailableSeat = (data: { id: string; name: string }) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        capacity: {
          ...state.vehicle_information.capacity,
          passenger_seats: {
            ...state.vehicle_information.capacity.passenger_seats,
            form: {
              ...state.vehicle_information.capacity.passenger_seats.form,
              available_seat: {
                ...state.vehicle_information.capacity.passenger_seats.form
                  .available_seat,
                selected: data,
              },
            },
          },
        },
      },
    });
  };

  const handleSelectAvailableChildSeat = (data: {
    id: string;
    name: string;
  }) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        capacity: {
          ...state.vehicle_information.capacity,
          passenger_seats: {
            ...state.vehicle_information.capacity.passenger_seats,
            form: {
              ...state.vehicle_information.capacity.passenger_seats.form,
              available_child_seat: {
                ...state.vehicle_information.capacity.passenger_seats.form
                  .available_child_seat,
                selected: data,
              },
            },
          },
        },
      },
    });
  };

  const handleSelectAvailableCarSeat = (data: { id: string; name: string }) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        capacity: {
          ...state.vehicle_information.capacity,
          passenger_seats: {
            ...state.vehicle_information.capacity.passenger_seats,
            form: {
              ...state.vehicle_information.capacity.passenger_seats.form,
              available_car_seat: {
                ...state.vehicle_information.capacity.passenger_seats.form
                  .available_car_seat,
                selected: data,
              },
            },
          },
        },
      },
    });
  };

  const handleSelectLuggage = (data: { id: string; name: string }) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        capacity: {
          ...state.vehicle_information.capacity,
          luggage: {
            ...state.vehicle_information.capacity.luggage,
            form: {
              ...state.vehicle_information.capacity.luggage.form,
              luggage: {
                ...state.vehicle_information.capacity.luggage.form.luggage,
                selected: data,
              },
            },
          },
        },
      },
    });
  };

  const handleSelectLuggageSize = (data: { id: string; name: string }) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        capacity: {
          ...state.vehicle_information.capacity,
          luggage: {
            ...state.vehicle_information.capacity.luggage,
            form: {
              ...state.vehicle_information.capacity.luggage.form,
              luggage_size: {
                ...state.vehicle_information.capacity.luggage.form.luggage_size,
                selected: data,
              },
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
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[0.875rem] text-[#232323CC] font-medium")}>
          {dictionaries.vehicle_information.capacity.title}
        </p>
        <p className={clsx("text-[0.75rem] text-[#606060] font-normal")}>
          {dictionaries.vehicle_information.capacity.description}
        </p>
      </div>

      {/* NOTES: passenger seats */}
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[0.875rem] text-[#232323CC] font-medium")}>
          {dictionaries.vehicle_information.capacity.passenger_seats.title}
        </p>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
            "w-full"
          )}
        >
          <Dropdownfield
            labelProps={{
              ...dictionaries.vehicle_information.capacity.passenger_seats.form
                .input.available_seat.labelProps,
            }}
            inputProps={{
              ...dictionaries.vehicle_information.capacity.passenger_seats.form
                .input.available_seat.inputProps,
            }}
            selected={
              state.vehicle_information.capacity.passenger_seats.form
                .available_seat.selected
            }
            items={
              state.vehicle_information.capacity.passenger_seats.form
                .available_seat.items
            }
            onSelect={handleSelectAvailableSeat}
          />
          <div
            className={clsx(
              "grid grid-cols-2 place-content-start place-items-start gap-[0.75rem]",
              "w-full"
            )}
          >
            <Dropdownfield
              labelProps={{
                ...dictionaries.vehicle_information.capacity.passenger_seats
                  .form.input.available_child_seat.labelProps,
              }}
              inputProps={{
                ...dictionaries.vehicle_information.capacity.passenger_seats
                  .form.input.available_child_seat.inputProps,
              }}
              selected={
                state.vehicle_information.capacity.passenger_seats.form
                  .available_child_seat.selected
              }
              items={
                state.vehicle_information.capacity.passenger_seats.form
                  .available_child_seat.items
              }
              onSelect={handleSelectAvailableChildSeat}
            />
            <Dropdownfield
              labelProps={{
                ...dictionaries.vehicle_information.capacity.passenger_seats
                  .form.input.available_car_seat.labelProps,
              }}
              inputProps={{
                ...dictionaries.vehicle_information.capacity.passenger_seats
                  .form.input.available_car_seat.inputProps,
              }}
              selected={
                state.vehicle_information.capacity.passenger_seats.form
                  .available_car_seat.selected
              }
              items={
                state.vehicle_information.capacity.passenger_seats.form
                  .available_car_seat.items
              }
              onSelect={handleSelectAvailableCarSeat}
            />
          </div>
        </div>
      </div>

      {/* NOTES:luggage */}
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[0.875rem] text-[#232323CC] font-medium")}>
          {dictionaries.vehicle_information.capacity.luggage.title}
        </p>

        <div
          className={clsx(
            "grid grid-cols-2 place-content-start place-items-start gap-[0.75rem]",
            "w-full"
          )}
        >
          <Dropdownfield
            labelProps={{
              ...dictionaries.vehicle_information.capacity.luggage.form.input
                .luggage.labelProps,
            }}
            inputProps={{
              ...dictionaries.vehicle_information.capacity.luggage.form.input
                .luggage.inputProps,
            }}
            selected={
              state.vehicle_information.capacity.luggage.form.luggage.selected
            }
            items={
              state.vehicle_information.capacity.luggage.form.luggage.items
            }
            onSelect={handleSelectLuggage}
          />

          <Dropdownfield
            labelProps={{
              ...dictionaries.vehicle_information.capacity.luggage.form.input
                .luggage_size.labelProps,
            }}
            inputProps={{
              ...dictionaries.vehicle_information.capacity.luggage.form.input
                .luggage_size.inputProps,
            }}
            selected={
              state.vehicle_information.capacity.luggage.form.luggage_size
                .selected
            }
            items={
              state.vehicle_information.capacity.luggage.form.luggage_size.items
            }
            onSelect={handleSelectLuggageSize}
          />
        </div>
      </div>

      {/*  */}
    </div>
  );
};
