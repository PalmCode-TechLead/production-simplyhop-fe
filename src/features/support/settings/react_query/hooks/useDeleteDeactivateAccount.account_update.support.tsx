import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { SettingsSupportReactQueryKey } from "../keys";
import {
  DeleteAuthDeactivateAccountErrorResponseInterface,
  DeleteAuthDeactivateAccountPayloadRequestInterface,
  DeleteAuthDeactivateAccountSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { fetchDeleteAuthDeactivateAccount } from "@/core/services/rest/simplyhop/auth";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { SettingsSupportContext } from "../../context";
import { v4 as uuidv4 } from "uuid";

export const useDeleteDeactivateAccount = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const { state: state } = React.useContext(SettingsSupportContext);
  const mutation = useMutation<
    DeleteAuthDeactivateAccountSuccessResponseInterface,
    DeleteAuthDeactivateAccountErrorResponseInterface
  >({
    mutationKey: SettingsSupportReactQueryKey.DeleteDeactivateAccount(),
    mutationFn: () => {
      const payload: DeleteAuthDeactivateAccountPayloadRequestInterface = {
        body: {
          password: state.deactivate_confirmation.form.password.value,
        },
      };
      return fetchDeleteAuthDeactivateAccount(payload);
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
