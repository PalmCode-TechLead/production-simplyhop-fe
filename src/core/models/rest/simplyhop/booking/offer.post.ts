import { NextApiRequest, NextApiResponse } from "next";

export interface PostBookingOfferRequestInterface extends NextApiRequest {
  payload?: PostBookingOfferPayloadRequestInterface;
}

export interface PostBookingOfferPayloadRequestInterface {
  path: PostBookingOfferPathPayloadRequestInterface;
  body: PostBookingOfferBodyPayloadRequestInterface;
}

export type PostBookingOfferPathPayloadRequestInterface = {
  id: string;
};

export interface PostBookingOfferBodyPayloadRequestInterface {
  offered_price: number;
}

export type PostBookingOfferResponseInterface = NextApiResponse<
  | PostBookingOfferSuccessResponseInterface
  | PostBookingOfferErrorResponseInterface
>;

export interface PostBookingOfferSuccessResponseInterface {
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

export interface PostBookingOfferErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
