import { NextApiResponse } from "next";

export type PostPaymentCancelResponseInterface = NextApiResponse<
  | PostPaymentCancelSuccessResponseInterface
  | PostPaymentCancelErrorResponseInterface
>;

export interface PostPaymentCancelSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    token: string;
    token_type: string;
    user: {
      id: number;
      name: string;
      email: string;
      avatar: string;
      email_verified_at: string;
      created_at: string;
      updated_at: string;
    };
  };
  redirect: null;
}

export interface PostPaymentCancelErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
