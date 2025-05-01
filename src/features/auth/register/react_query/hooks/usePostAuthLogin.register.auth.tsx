import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { RegisterAuthReactQueryKey } from "../keys";
import {
  PostAuthLoginErrorResponseInterface,
  PostAuthLoginPayloadRequestInterface,
  PostAuthLoginSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { RegisterAuthContext } from "../../context";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { fetchPostAuthLogin } from "@/core/services/rest/simplyhop/auth";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";

export const usePostAuthLogin = () => {
  const router = useRouter();

  const { state } = React.useContext(RegisterAuthContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostAuthLoginSuccessResponseInterface,
    PostAuthLoginErrorResponseInterface
  >({
    mutationKey: RegisterAuthReactQueryKey.PostLogin(),
    mutationFn: () => {
      const payload: PostAuthLoginPayloadRequestInterface = {
        body: {
          email: state.general.email.value,
          password: state.password_setup.password.value,
        },
      };
      return fetchPostAuthLogin(payload);
    },
    onSuccess(data) {
      const cookies = new Cookies();
      cookies.set("token", data.data.token, { path: "/" });
      const user = data.data.user;
      router.push(AppCollectionURL.private.profile_registration());
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
