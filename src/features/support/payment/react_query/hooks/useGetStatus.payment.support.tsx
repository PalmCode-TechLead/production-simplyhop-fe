import { useQuery } from "@tanstack/react-query";
import { PaymentSupportReactQueryKey } from "../keys";
import { fetchGetPaymentStatus } from "@/core/services/rest/simplyhop/payment";
import {
  GetPaymentStatusErrorResponseInterface,
  GetPaymentStatusSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/payment";
import { useSearchParams } from "next/navigation";

export const useGetPaymentStatus = () => {
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");
  const query = useQuery<
    GetPaymentStatusSuccessResponseInterface,
    GetPaymentStatusErrorResponseInterface
  >({
    queryKey: PaymentSupportReactQueryKey.GetPaymentStatus(),
    queryFn: () => {
      return fetchGetPaymentStatus();
    },
    refetchInterval: !!callback ? 10 * 1000 : undefined,
  });

  return query;
};
