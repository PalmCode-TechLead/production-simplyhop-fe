import { Booking, RideTime, User, Vehicle } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetRidesMyRequestInterface extends NextApiRequest {
  payload?: GetRidesMyPayloadRequestInterface;
}

export interface GetRidesMyPayloadRequestInterface {
  params?: GetRidesMyParamsPayloadRequestInterface;
}

export type GetRidesMyParamsPayloadRequestInterface = {
  departure_time__lte?: string;
  departure_time__gte?: string;
  booking_status?: string;
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
    bookings: Booking[];
    user: User;
    vehicle: Vehicle;
    ride_times: RideTime[];
  }[];

  redirect: null;
}

export interface GetRidesMyErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
