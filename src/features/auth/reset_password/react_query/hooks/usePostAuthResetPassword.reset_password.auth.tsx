"use client";
import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { ResetPasswordAuthReactQueryKey } from "../keys";
import {
  PostAuthResetPasswordErrorResponseInterface,
  PostAuthResetPasswordPayloadRequestInterface,
  PostAuthResetPasswordSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { ResetPasswordAuthContext } from "../../context";
import { fetchPostAuthResetPassword } from "@/core/services/rest/simplyhop/auth";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "next/navigation";

export const usePostAuthResetPassword = () => {
  const { state } = React.useContext(ResetPasswordAuthContext);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("token");
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostAuthResetPasswordSuccessResponseInterface,
    PostAuthResetPasswordErrorResponseInterface
  >({
    mutationKey: ResetPasswordAuthReactQueryKey.PostResetPassword(),
    mutationFn: () => {
      const payload: PostAuthResetPasswordPayloadRequestInterface = {
        body: {
          token: String(token ?? ""),
          email: String(email ?? ""),
          password: state.form.password.value,
          password_confirmation: state.form.password_confirmation.value,
        },
      };
      return fetchPostAuthResetPassword(payload);
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
