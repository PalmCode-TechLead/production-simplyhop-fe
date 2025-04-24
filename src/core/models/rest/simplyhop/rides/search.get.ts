import { RideTime, User, Vehicle } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetRidesSearchRequestInterface extends NextApiRequest {
  payload?: GetRidesSearchPayloadRequestInterface;
}

export interface GetRidesSearchPayloadRequestInterface {
  params?: GetRidesSearchParamsPayloadRequestInterface;
}

export type GetRidesSearchParamsPayloadRequestInterface = {
  start_lat?: number;
  start_long?: number;
  destination_lat?: number;
  destination_long?: number;
  "filter[departure_time]"?: string;
  "filter[rideTimes.available_seats]"?: string;
  "filter[numb_of_luggages]"?: string;
  "filter[music_availability]"?: boolean;
  "filter[smoke_allowed]"?: boolean;
  "filter[pet_allowed]"?: boolean;
  include?: string;
  //mandatory
  sort?: string;
  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetRidesSearchResponseInterface = NextApiResponse<
  GetRidesSearchSuccessResponseInterface | GetRidesSearchErrorResponseInterface
>;

export interface GetRidesSearchSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    id: number; // 10;
    user_id: number; // 10;
    unique_code: null | string;
    vehicle_id: number; // 10;
    start_lat: number; // 52.5092996;
    start_long: number; // 13.421813;
    start_name: string | null; // Munich;
    destination_lat: number; // 48.1250433;
    destination_long: number; // 11.6209174;
    destination_name: string | null; // Munich;
    eta: number | null;
    recurring_ride: string; // "no";
    waiting_time: string; // "5 mins";
    luggage_allowed: boolean; // true;
    maxtwo_backseat: boolean; // false;
    additional_info: string; // "Error cupiditate ut assumenda similique.";
    base_price: number; // 60.98;
    deleted_at: null | string;
    created_at: string; // "2025-04-21T07:24:52.000000Z";
    updated_at: string; // "2025-04-21T07:24:52.000000Z";
    distance_to_start_point: number; //  1.2778371921134954;
    distance_to_destination_point: number; // 3.0995911664307627;
    ride_times: RideTime[];
    vehicle: Vehicle;
    user: User;
  }[];

  redirect: null;
}

export interface GetRidesSearchErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
