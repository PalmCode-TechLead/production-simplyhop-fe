import { NextApiRequest, NextApiResponse } from "next";

export interface PostBookingRejectRequestInterface extends NextApiRequest {
  payload?: PostBookingRejectPayloadRequestInterface;
}

export interface PostBookingRejectPayloadRequestInterface {
  path: PostBookingRejectPathPayloadRequestInterface;
}

export type PostBookingRejectPathPayloadRequestInterface = {
  id: string;
};

export type PostBookingRejectResponseInterface = NextApiResponse<
  | PostBookingRejectSuccessResponseInterface
  | PostBookingRejectErrorResponseInterface
>;

export interface PostBookingRejectSuccessResponseInterface {
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

export interface PostBookingRejectErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
