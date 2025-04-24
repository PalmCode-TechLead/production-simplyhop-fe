import { Vehicle } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetRidesMyRequestInterface extends NextApiRequest {
  payload?: GetRidesMyPayloadRequestInterface;
}

export interface GetRidesMyPayloadRequestInterface {
  params?: GetRidesMyParamsPayloadRequestInterface;
}

export type GetRidesMyParamsPayloadRequestInterface = {
  "filter[departure_time__lte]"?: string;
  "filter[departure_time__gte]"?: string;
  //mandatory
  include?: string; //user, userCount, userExists, user.profile, vehicle, vehicleCount, vehicleExists, vehicle.brand, vehicle.category, rideTimes, rideTimesCount, rideTimesExists, bookings, bookingsCount, bookingsExists, bookings.rideTime, bookings.bargainOffers
  sort?: string;
  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetRidesMyResponseInterface = NextApiResponse<
  GetRidesMySuccessResponseInterface | GetRidesMyErrorResponseInterface
>;

export interface GetRidesMySuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    id: 1;
    user_id: 1;
    unique_code: null;
    vehicle_id: 1;
    start_lat: 52.5466046;
    start_long: 13.371483;
    start_name: "Berlin";
    destination_lat: 48.1162453;
    destination_long: 11.5728604;
    destination_name: "München";
    eta: 21600;
    recurring_ride: "no";
    waiting_time: "5 mins";
    luggage_allowed: true;
    maxtwo_backseat: true;
    additional_info: "Voluptatum consequatur dicta ut laboriosam molestiae sit.";
    base_price: 77.08;
    deleted_at: null;
    created_at: "2025-04-22T03:46:39.000000Z";
    updated_at: "2025-04-22T03:46:39.000000Z";
    user: {
      id: 1;
      first_name: "Gracie";
      last_name: "Effertz";
      email: "user@example.com";
      mobile: null;
      city: null;
      email_verified_at: "2025-04-22 10:44:18";
      avatar: null;
      is_driver: 1;
      can_share_ride: 0;
      deleted_at: null;
      created_at: "2025-04-22 03:44:21";
      updated_at: "2025-04-22 03:46:39";
    };
    vehicle: Vehicle;
    ride_times: {
      id: 1;
      available_seats: 3;
      available_child_seats: 1;
      departure_time: "2025-05-01T02:00:00.000000Z";
      deleted_at: null;
      created_at: "2025-04-22T03:46:39.000000Z";
      updated_at: "2025-04-22T03:46:39.000000Z";
    }[];
  }[];

  redirect: null;
}

export interface GetRidesMyErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
