import { NextApiRequest, NextApiResponse } from "next";

export interface GetMessageRoomsListRequestInterface extends NextApiRequest {
  payload?: GetMessageRoomsListPayloadRequestInterface;
}

export interface GetMessageRoomsListPayloadRequestInterface {
  params?: GetMessageRoomsListParamsPayloadRequestInterface;
}

export type GetMessageRoomsListParamsPayloadRequestInterface = {
  include?: string; //messages, messagesCount, messagesExists, passenger, passengerCount, passengerExists, driver, driverCount, driverExists, rideBooking, rideBookingCount, rideBookingExists
  //mandatory
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
    message_room_id: number; //1;
    ride_booking_id: number; //1;
    sender_id: number; //1;
    passenger_id: number; //1;
    driver_id: number; //2;
    contents: {
      type: string; //"offer_request";
      message: string; //"The passenger has booked a ride and offered a price of 60";
      booking_id: number; //1;
      offered_price: number; //60;
    };
    read_at_driver: boolean | null;
    read_at_passenger: boolean | null;
    deleted_at: string | null;
    created_at: string; //"2025-04-22T03:47:51.000000Z";
    updated_at: string; //"2025-04-22T03:47:51.000000Z";
  }[];

  redirect: null;
}

export interface GetMessageRoomsListErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
