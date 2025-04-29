import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { SettingsSupportReactQueryKey } from "../keys";
import {
  PostAuthChangePasswordErrorResponseInterface,
  PostAuthChangePasswordPayloadRequestInterface,
  PostAuthChangePasswordSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { SettingsSupportContext } from "../../context";
import { fetchPostAuthChangePassword } from "@/core/services/rest/simplyhop/auth";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";

export const usePostAuthChangePassword = () => {
  const { state } = React.useContext(SettingsSupportContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostAuthChangePasswordSuccessResponseInterface,
    PostAuthChangePasswordErrorResponseInterface
  >({
    mutationKey: SettingsSupportReactQueryKey.PostChangePassword(),
    mutationFn: () => {
      const payload: PostAuthChangePasswordPayloadRequestInterface = {
        body: {
          old_password: state.change_password.form.actual_password.value,
          password: state.change_password.form.new_password.value,
          password_confirmation:
            state.change_password.form.confirm_new_password.value,
        },
      };
      return fetchPostAuthChangePassword(payload);
    },

    onError(error) {
      dispatchGlobal({
        type: GlobalActionEnum.SetAlertData,
        payload: {
          ...globalState.alert,
          items: [
            ...globalState.alert.items,
            {
              id: uuidv4(),
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
