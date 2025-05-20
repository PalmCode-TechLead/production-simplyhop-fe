import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordAuthReactQueryKey } from "../keys";
import {
  PostAuthForgotPasswordErrorResponseInterface,
  PostAuthForgotPasswordPayloadRequestInterface,
  PostAuthForgotPasswordSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { ForgotPasswordAuthContext } from "../../context";
import { fetchPostAuthForgotPassword } from "@/core/services/rest/simplyhop/auth";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";

export const usePostAuthForgotPassword = () => {
  const { state } = React.useContext(ForgotPasswordAuthContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostAuthForgotPasswordSuccessResponseInterface,
    PostAuthForgotPasswordErrorResponseInterface
  >({
    mutationKey: ForgotPasswordAuthReactQueryKey.PostForgotPassword(),
    mutationFn: () => {
      const payload: PostAuthForgotPasswordPayloadRequestInterface = {
        body: {
          email: state.form.email.value,
        },
      };
      return fetchPostAuthForgotPassword(payload);
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
