import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { RegistrationProfileReactQueryKey } from "../keys";
import {
  PostUserProfileCreateErrorResponseInterface,
  PostUserProfileCreatePayloadRequestInterface,
  PostUserProfileCreateSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user_profile";
import { RegistrationProfileContext } from "../../context";
import { fetchPostUserProfileCreate } from "@/core/services/rest/simplyhop/user_profile";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";

export const usePostUserProfileCreate = () => {
  const { state } = React.useContext(RegistrationProfileContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostUserProfileCreateSuccessResponseInterface,
    PostUserProfileCreateErrorResponseInterface
  >({
    mutationKey: RegistrationProfileReactQueryKey.PostUserProfileCreate(),
    mutationFn: () => {
      const payload: PostUserProfileCreatePayloadRequestInterface = {
        body: {
          first_name: state.personal_information.form.first_name.value,
          last_name: state.personal_information.form.last_name.value,
          city: state.personal_information.form.city.value,
          mobile: state.personal_information.form.phonenumber.value, //nyimpen tanpa plus
          ride_offer: true,
          mobile_is_show: true, // true terus karena bakal di show terus
          bio: state.personal_information.form.about_me.value, // -> bio
          information: "",
        },
      };
      return fetchPostUserProfileCreate(payload);
    },
    onSuccess() {},
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
