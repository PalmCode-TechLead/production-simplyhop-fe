import { useMutation } from "@tanstack/react-query";
import { PaymentSupportReactQueryKey } from "../keys";
import {
  GetPaymentSubscribeErrorResponseInterface,
  GetPaymentSubscribeSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/payment";
import { fetchGetPaymentSubscribe } from "@/core/services/rest/simplyhop/payment";

export const useGetPaymentSubscribe = () => {
  const mutation = useMutation<
    GetPaymentSubscribeSuccessResponseInterface,
    GetPaymentSubscribeErrorResponseInterface
  >({
    mutationKey: PaymentSupportReactQueryKey.GetPaymentSubscribe(),
    mutationFn: () => {
      return fetchGetPaymentSubscribe();
    },
    onSuccess(data) {
      if (typeof window !== "undefined") {
        window.location.href = data.url;
      }
    },
  });
  return mutation;
};
