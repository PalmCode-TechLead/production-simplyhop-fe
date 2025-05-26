import { useQuery } from "@tanstack/react-query";
import { PaymentSupportReactQueryKey } from "../keys";
import { fetchGetPaymentBillingPortal } from "@/core/services/rest/simplyhop/payment";
import {
  GetPaymentBillingPortalErrorResponseInterface,
  GetPaymentBillingPortalSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/payment";
type Options = {
  enabled: boolean;
};

export const useGetPaymentBillingPortal = (options?: Options) => {
  const query = useQuery<
    GetPaymentBillingPortalSuccessResponseInterface,
    GetPaymentBillingPortalErrorResponseInterface
  >({
    queryKey: PaymentSupportReactQueryKey.GetPaymentBillingPortal(),
    queryFn: () => {
      return fetchGetPaymentBillingPortal();
    },
    enabled: options?.enabled ?? true,
  });

  return query;
};
