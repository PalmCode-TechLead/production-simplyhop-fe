import { useQuery } from "@tanstack/react-query";
import { PaymentSupportReactQueryKey } from "../keys";
import { fetchGetPaymentStatus } from "@/core/services/rest/simplyhop/payment";
import {
  GetPaymentStatusErrorResponseInterface,
  GetPaymentStatusSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/payment";

export const useGetPaymentStatus = () => {
  const query = useQuery<
    GetPaymentStatusSuccessResponseInterface,
    GetPaymentStatusErrorResponseInterface
  >({
    queryKey: PaymentSupportReactQueryKey.GetPaymentStatus(),
    queryFn: () => {
      return fetchGetPaymentStatus();
    },
  });

  return query;
};
