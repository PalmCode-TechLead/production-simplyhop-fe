import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { AccountUpdateSupportReactQueryKey } from "../keys";
import {
  PostUserProfileCreateErrorResponseInterface,
  PostUserProfileCreatePayloadRequestInterface,
  PostUserProfileCreateSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/user_profile";
import { AccountUpdateSupportContext } from "../../context";
import { fetchPostUserProfileCreate } from "@/core/services/rest/simplyhop/user_profile";
import {
  GlobalActionEnum,
  GlobalContext,
  UserActionEnum,
  UserContext,
} from "@/core/modules/app/context";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const usePostUserProfileCreate = () => {
  const router = useRouter();
  const { state: userState, dispatch: dispatchUser } =
    React.useContext(UserContext);
  const { state } = React.useContext(AccountUpdateSupportContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostUserProfileCreateSuccessResponseInterface,
    PostUserProfileCreateErrorResponseInterface
  >({
    mutationKey: AccountUpdateSupportReactQueryKey.PostUserProfileCreate(),
    mutationFn: () => {
      const payload: PostUserProfileCreatePayloadRequestInterface = {
        body: {
          first_name: state.form.first_name.value,
          last_name: state.form.last_name.value,
          city: state.form.city.value, // ada
          mobile: state.form.phonenumber.value, //nyimpen tanpa plus
          ride_offer: true,
          mobile_is_show: true, // true terus karena bakal di show terus
          bio: state.form.about_me.value, // -> bio
          information: "",
          is_driver:state.
        },
      };
      return fetchPostUserProfileCreate(payload);
    },
    onSuccess() {
      dispatchUser({
        type: UserActionEnum.SetProfileData,
        payload: {
          ...userState.profile,
          first_name: state.form.first_name.value,
          last_name: state.form.last_name.value,
          city: state.form.city.value,
          phonenumber: state.form.phonenumber.value,
          about_me: state.form.about_me.value,
        },
      });
      router.push(AppCollectionURL.private.support_account());
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
