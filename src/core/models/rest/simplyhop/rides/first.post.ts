import { NextApiRequest, NextApiResponse } from "next";

export interface PostRidesFirstRequestInterface extends NextApiRequest {
  payload?: PostRidesFirstPayloadRequestInterface;
}

export interface PostRidesFirstPayloadRequestInterface {
  body: PostRidesFirstBodyPayloadRequestInterface;
}

export type PostRidesFirstBodyPayloadRequestInterface = {
  vehicle_id: number; //8;
  start_lat: number; //52.52;
  start_long: number; //13.404954;
  destination_lat: number; //48.1351253;
  destination_long: number; //11.5819804;
  departure_time: string; // "2025-03-31 09:30:00";
};

export type PostRidesFirstResponseInterface = NextApiResponse<
  PostRidesFirstSuccessResponseInterface | PostRidesFirstErrorResponseInterface
>;

export interface PostRidesFirstSuccessResponseInterface {
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

export interface PostRidesFirstErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
