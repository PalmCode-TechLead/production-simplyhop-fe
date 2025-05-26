import { NextApiResponse } from "next";

export type GetPaymentStatusResponseInterface = NextApiResponse<
  | GetPaymentStatusSuccessResponseInterface
  | GetPaymentStatusErrorResponseInterface
>;

export interface GetPaymentStatusSuccessResponseInterface {
  active: boolean;
  status: string | null;
  ends_at: string | null;
}

export interface GetPaymentStatusErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
