import { NextApiResponse } from "next";

export type GetPaymentSubscribeResponseInterface = NextApiResponse<
  | GetPaymentSubscribeSuccessResponseInterface
  | GetPaymentSubscribeErrorResponseInterface
>;

export interface GetPaymentSubscribeSuccessResponseInterface {
  url: string;
}

export interface GetPaymentSubscribeErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
