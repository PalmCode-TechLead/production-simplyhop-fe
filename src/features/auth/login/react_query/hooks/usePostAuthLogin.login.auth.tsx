import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { LoginAuthReactQueryKey } from "../keys";
import {
  PostAuthLoginErrorResponseInterface,
  PostAuthLoginPayloadRequestInterface,
  PostAuthLoginSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { LoginAuthContext } from "../../context";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { fetchPostAuthLogin } from "@/core/services/rest/simplyhop/auth";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";

export const usePostAuthLogin = () => {
  const router = useRouter();

  const { state } = React.useContext(LoginAuthContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostAuthLoginSuccessResponseInterface,
    PostAuthLoginErrorResponseInterface
  >({
    mutationKey: LoginAuthReactQueryKey.PostLogin(),
    mutationFn: () => {
      const payload: PostAuthLoginPayloadRequestInterface = {
        body: {
          email: state.form.email.value,
          password: state.form.password.value,
        },
      };
      return fetchPostAuthLogin(payload);
    },
    onSuccess(data) {
      const cookies = new Cookies();
      cookies.set("token", data.data.token, { path: "/" });
      router.push(AppCollectionURL.public.home());
    },
    onError(error) {
      dispatchGlobal({
        type: GlobalActionEnum.SetAlertData,
        payload: {
          ...globalState.alert,
          items: [
            ...globalState.alert.items,
            {
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
