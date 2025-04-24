import { NextApiRequest, NextApiResponse } from "next";

export interface PostBookingAcceptRequestInterface extends NextApiRequest {
  payload?: PostBookingAcceptPayloadRequestInterface;
}

export interface PostBookingAcceptPayloadRequestInterface {
  path: PostBookingAcceptPathPayloadRequestInterface;
}

export type PostBookingAcceptPathPayloadRequestInterface = {
  id: string;
};

export type PostBookingAcceptResponseInterface = NextApiResponse<
  | PostBookingAcceptSuccessResponseInterface
  | PostBookingAcceptErrorResponseInterface
>;

export interface PostBookingAcceptSuccessResponseInterface {
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

export interface PostBookingAcceptErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
