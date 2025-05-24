import { useMutation } from "@tanstack/react-query";
import { PaymentSupportReactQueryKey } from "../keys";
import {
  PostPaymentCancelErrorResponseInterface,
  PostPaymentCancelSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/payment";
import { fetchPostPaymentCancel } from "@/core/services/rest/simplyhop/payment";

export const usePostPaymentCancel = () => {
  const mutation = useMutation<
    PostPaymentCancelSuccessResponseInterface,
    PostPaymentCancelErrorResponseInterface
  >({
    mutationKey: PaymentSupportReactQueryKey.PostPaymentCancel(),
    mutationFn: () => {
      return fetchPostPaymentCancel();
    },
  });
  return mutation;
};
