import { NextApiResponse } from "next";

export type GetPaymentBillingPortalResponseInterface = NextApiResponse<
  | GetPaymentBillingPortalSuccessResponseInterface
  | GetPaymentBillingPortalErrorResponseInterface
>;

export interface GetPaymentBillingPortalSuccessResponseInterface {
  url: string;
}

export interface GetPaymentBillingPortalErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
