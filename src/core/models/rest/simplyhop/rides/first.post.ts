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
  start_name: string; //"Munchen",
  destination_lat: number; //48.1351253;
  destination_long: number; //11.5819804;
  destination_name: string; //"Berlin",
  eta: number;
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
    id: number; //12;
    unique_code: string; //"2139rfkdsfns";
    user_id: number; //8;
    vehicle_id: number; //8;
    start_city: number; //"München";
    start_lat: number; //37.774929;
    start_long: number; // -122.419418;
    destination_lat: number; //37.774929;
    destination_long: number; //-122.419418;
    start_name: string; // "Munchen";
    destination_name: string; //"Berlin";
    eta: number; //120;
    recurring_ride: string; //"no";
    waiting_time: string; //"5 minuten";
    luggage_allowed: boolean; //false;
    available_seats: number; //2;
    maxtwo_backseat: boolean; //false;
    additional_info: string; //"information";
    base_price: number; //0;
    created_at: string; //"2025-04-21T15:36:25.578Z";
    updated_at: string; // "2025-04-21T15:36:25.578Z";
  };
  redirect: null;
}

export interface PostRidesFirstErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
