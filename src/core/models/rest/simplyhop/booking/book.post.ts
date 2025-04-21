import { NextApiRequest, NextApiResponse } from "next";

export interface PostBookingBookRequestInterface extends NextApiRequest {
  payload?: PostBookingBookPayloadRequestInterface;
}

export interface PostBookingBookPayloadRequestInterface {
  body: PostBookingBookBodyPayloadRequestInterface;
}

export type PostBookingBookBodyPayloadRequestInterface = {
  ride_id: number; //1;
  seats: number; //2;
  ride_time_id: number; //2;
  offered_price: number; //120;
  message?: string; //"";
};

export type PostBookingBookResponseInterface = NextApiResponse<
  | PostBookingBookSuccessResponseInterface
  | PostBookingBookErrorResponseInterface
>;

export interface PostBookingBookSuccessResponseInterface {
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

export interface PostBookingBookErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
