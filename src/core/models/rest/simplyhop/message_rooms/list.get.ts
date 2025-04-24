import { User, Message } from "@/core/models/data";

import { NextApiRequest, NextApiResponse } from "next";

export interface GetMessageRoomsListRequestInterface extends NextApiRequest {
  payload?: GetMessageRoomsListPayloadRequestInterface;
}

export interface GetMessageRoomsListPayloadRequestInterface {
  params?: GetMessageRoomsListParamsPayloadRequestInterface;
}

export type GetMessageRoomsListParamsPayloadRequestInterface = {
  include?: string; //messages, messagesCount, messagesExists, passenger, passengerCount, passengerExists, driver, driverCount, driverExists, rideBooking, rideBookingCount, rideBookingExists
  "filter[driver_id]"?: number;
  "filter[passenger_id]"?: number;

  sort?: string;

  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetMessageRoomsListResponseInterface = NextApiResponse<
  | GetMessageRoomsListSuccessResponseInterface
  | GetMessageRoomsListErrorResponseInterface
>;

export interface GetMessageRoomsListSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    id: number; //1;
    ride_booking_id: number; //1;
    passenger_id: number; //1;
    driver_id: number; //2;
    is_passenger_read: number; //0;
    is_driver_read: number; //0;
    created_at: string; //"2025-04-22T03:47:51.000000Z";
    updated_at: string; //"2025-04-22T03:47:51.000000Z";
    driver_exists: boolean; //true;
    passenger_exists: boolean; //true;
    messages_exists: boolean; //true;
    messages: Message[];
    passenger: User;
    driver: User;
  }[];

  redirect: null;
}

export interface GetMessageRoomsListErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
