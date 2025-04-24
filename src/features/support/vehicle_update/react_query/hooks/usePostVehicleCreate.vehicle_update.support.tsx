import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { VehicleUpdateSupportReactQueryKey } from "../keys";
import {
  PostVehicleCreateMyBodyRequestInterface,
  PostVehicleCreateMyErrorResponseInterface,
  PostVehicleCreateMyPayloadRequestInterface,
  PostVehicleCreateMySuccessResponseInterface,
} from "@/core/models/rest/simplyhop/vehicle";
import { VehicleUpdateSupportContext } from "../../context";
import { fetchPostVehicleCreateMy } from "@/core/services/rest/simplyhop/vehicle";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";

export const usePostVehicleCreateMy = () => {
  const { state } = React.useContext(VehicleUpdateSupportContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostVehicleCreateMySuccessResponseInterface,
    PostVehicleCreateMyErrorResponseInterface
  >({
    mutationKey: VehicleUpdateSupportReactQueryKey.PostVehicleCreateMy(),
    mutationFn: () => {
      const bodyPayload: PostVehicleCreateMyBodyRequestInterface = {
        category_id: !state.vehicle_information.general.form.car_category
          .selected
          ? 0
          : Number(
              state.vehicle_information.general.form.car_category.selected.id
            ), //sedan, suv
        brand_id: !state.vehicle_information.general.form.car_brand.selected
          ? 0
          : Number(
              state.vehicle_information.general.form.car_brand.selected.id
            ), // toyota
        model: state.vehicle_information.general.form.car_model.value, // mazda, agya
        color: state.vehicle_information.general.form.car_color.value,
        plate_license:
          state.vehicle_information.general.form.license_plate.value,
        numb_of_free_seats: !state.vehicle_information.capacity.passenger_seats
          .form.available_seat.selected
          ? 0
          : Number(
              state.vehicle_information.capacity.passenger_seats.form
                .available_seat
            ),
        smoke_allowed: !state.vehicle_information.trip.form.smoking.selected
          ? false
          : Boolean(state.vehicle_information.trip.form.smoking.selected.id),
        pet_allowed: !state.vehicle_information.trip.form.pet.selected
          ? false
          : Boolean(state.vehicle_information.trip.form.pet.selected.id),
        music_availability: !state.vehicle_information.trip.form.music.selected
          ? false
          : Boolean(state.vehicle_information.trip.form.music.selected.id),
        childseat_availability: !state.vehicle_information.capacity
          .passenger_seats.form.available_child_seat.selected
          ? false
          : Boolean(
              state.vehicle_information.capacity.passenger_seats.form
                .available_child_seat.selected.id
            ),
        numb_of_childseats: !state.vehicle_information.capacity.passenger_seats
          .form.available_car_seat.selected
          ? 0
          : Number(
              state.vehicle_information.capacity.passenger_seats.form
                .available_car_seat
            ),
        numb_of_luggages: !state.vehicle_information.capacity.luggage.form
          .luggage.selected?.id
          ? 0
          : Number(
              state.vehicle_information.capacity.luggage.form.luggage.selected
                ?.id
            ),
        size_of_luggages:
          state.vehicle_information.capacity.luggage.form.luggage_size.selected
            ?.id ?? "",
        image: state.vehicle_information.pictures.files,
      };
      const formData = new FormData();

      const cleanedObj = Object.fromEntries(
        Object.entries(bodyPayload).filter(([_, value]) => value !== undefined)
      );

      for (const key of Object.keys(cleanedObj)) {
        if (key === "image" && Array.isArray(cleanedObj[key])) {
          cleanedObj[key].forEach((file: File) => {
            formData.append(key, file);
          });
        } else {
          formData.append(
            key,
            String((cleanedObj as { [key: string]: string })[key])
          );
        }
      }

      const payload: PostVehicleCreateMyPayloadRequestInterface = {
        body: formData,
      };

      return fetchPostVehicleCreateMy(payload);
    },
    onError(error) {
      dispatchGlobal({
        type: GlobalActionEnum.SetAlertData,
        payload: {
          ...globalState.alert,
          items: [
            ...globalState.alert.items,
            {
              id: "ERROR_CREATE_USER_PROFILE",
              variant: "error",
              message: error.message,
            },
          ],
        },
      });
    },
  });
  return mutation;
};
