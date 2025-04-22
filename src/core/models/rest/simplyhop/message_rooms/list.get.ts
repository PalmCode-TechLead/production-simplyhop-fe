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
    messages: {
      id: number; //1;
      message_room_id: number; //1;
      ride_booking_id: number; //1;
      sender_id: number; //1;
      passenger_id: number; //1;
      driver_id: number; //2;
      contents: string; //'{"type":"offer_request","message":"The passenger has booked a ride and offered a price of 60","booking_id":1,"offered_price":60}';
      read_at_driver: boolean | null;
      read_at_passenger: boolean | null;
      deleted_at: string | null;
      created_at: string; //"2025-04-22T03:47:51.000000Z";
      updated_at: string; //"2025-04-22T03:47:51.000000Z";
    }[];
    passenger: {
      id: number; //1;
      first_name: string; //"Gracie";
      last_name: string; //"Effertz";
      email: string; //"user@example.com";
      mobile: null | string;
      city: null | string;
      email_verified_at: string; //"2025-04-22 10:44:18";
      avatar: null | string;
      is_driver: number; //1;
      can_share_ride: number; //0;
      deleted_at: null | string;
      created_at: string; //"2025-04-22 03:44:21";
      updated_at: string; //"2025-04-22 03:46:39";
    };
    driver: {
      id: number; //2;
      first_name: string; //"Jesus";
      last_name: string; //"Kautzer";
      email: string; // "user2@example.com";
      mobile: string | null;
      city: string | null;
      email_verified_at: string; //"2025-04-22 10:44:18";
      avatar: string | null;
      is_driver: number; // 1;
      can_share_ride: number; // 0;
      deleted_at: string | null;
      created_at: string; // "2025-04-22 03:44:21";
      updated_at: string; // "2025-04-22 03:46:39";
    };
  }[];

  redirect: null;
}

export interface GetMessageRoomsListErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
