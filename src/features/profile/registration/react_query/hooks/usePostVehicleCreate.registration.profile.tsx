import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { RegistrationProfileReactQueryKey } from "../keys";
import {
  PostVehicleCreateBodyRequestInterface,
  PostVehicleCreateErrorResponseInterface,
  PostVehicleCreatePayloadRequestInterface,
  PostVehicleCreateSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/vehicle";
import { RegistrationProfileContext } from "../../context";
import { fetchPostVehicleCreate } from "@/core/services/rest/simplyhop/vehicle";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";

export const usePostVehicleCreate = () => {
  const { state } = React.useContext(RegistrationProfileContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostVehicleCreateSuccessResponseInterface,
    PostVehicleCreateErrorResponseInterface
  >({
    mutationKey: RegistrationProfileReactQueryKey.PostVehicleCreate(),
    mutationFn: () => {
      const bodyPayload: PostVehicleCreateBodyRequestInterface = {
        user_id: 0,
        category_id: 0,
        brand_id: 0,
        model: "",
        color: "",
        plate_license: "",
        total_places: "",
        numb_of_free_seats: 0,
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
        numb_of_childseat: 0,
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
        image: [],
      };
      const formData = new FormData();
      for (const key of Object.keys(bodyPayload)) {
        formData.append(
          key,
          String((bodyPayload as { [key: string]: any })[key])
        );
      }
      const payload: PostVehicleCreatePayloadRequestInterface = {
        body: formData,
      };

      return fetchPostVehicleCreate(payload);
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
