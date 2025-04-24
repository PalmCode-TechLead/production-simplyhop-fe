import { NextApiRequest, NextApiResponse } from "next";

export interface GetMessagesListByRoomRequestInterface extends NextApiRequest {
  payload?: GetMessagesListByRoomPayloadRequestInterface;
}

export interface GetMessagesListByRoomPayloadRequestInterface {
  params?: GetMessagesListByRoomParamsPayloadRequestInterface;
  path: GetMessagesListByRoomPathPayloadRequestInterface;
}

export type GetMessagesListByRoomPathPayloadRequestInterface = {
  roomId: string;
};

export type GetMessagesListByRoomParamsPayloadRequestInterface = {
  include?: string; //rideTime, rideTimeCount, rideTimeExists, driver, driverCount, driverExists, passenger, passengerCount, passengerExists
  //mandatory
  ride_booking_id?: number;
  message_room_id?: number;
  sort?: string;
  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetMessagesListByRoomResponseInterface = NextApiResponse<
  | GetMessagesListByRoomSuccessResponseInterface
  | GetMessagesListByRoomErrorResponseInterface
>;

export interface GetMessagesListByRoomSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    id: number; //2;
    message_room_id: number; //2;
    ride_booking_id: number; //2;
    sender_id: number; //1;
    passenger_id: number; //1;
    driver_id: number; //3;
    contents: {
      type: string; //"offer_request";
      message: string; //"The passenger has booked a ride and offered a price of 20. ";
      total_amount: number; //12.86;
      offered_price: number; //20;
    };
    read_at_driver: null | boolean;
    read_at_passenger: null | boolean;
    deleted_at: null | string;
    created_at: string; //"2025-04-24T08:04:22.000000Z";
    updated_at: string; //"2025-04-24T08:04:22.000000Z";
    booking_count: number; //1;
    booking_exists: boolean; //true;
    driver_count: number; //1;
    driver_exists: boolean; //true;
    passenger_count: number; //1;
    passenger_exists: boolean; //true;
    booking: {
      id: number; //2;
      user_id: number; //1;
      ride_id: number; //3;
      ride_time_id: number; //3;
      status: string; //"pending";
      payment_status: string; //"pending";
      total_amount: number; //12.86;
      offered_price: number; //20;
      seats: number; //2;
      child_seats: number; //0;
      deleted_at: null | string;
      created_at: string; // "2025-04-24T08:04:22.000000Z";
      updated_at: string; //"2025-04-24T08:04:22.000000Z";
      ride_time: {
        id: number; //3;
        available_seats: number; //2;
        available_child_seats: number; //1;
        departure_time: string; //"2025-04-29T23:00:00.000000Z";
        deleted_at: null | string;
        created_at: number; //"2025-04-24T08:03:38.000000Z";
        updated_at: string; //"2025-04-24T08:03:38.000000Z";
      };
      ride: {
        id: number; //3;
        user_id: number; //3;
        unique_code: null | string;
        vehicle_id: number; //3;
        start_lat: number; //52.4812816;
        start_long: number; //13.421814;
        start_name: string; //"Berlin";
        destination_lat: number; //48.0980803;
        destination_long: number; //11.5408584;
        destination_name: string; //"München";
        eta: number; //21600;
        recurring_ride: string; //"no";
        waiting_time: string; //"5 mins";
        luggage_allowed: boolean; //true;
        maxtwo_backseat: boolean; //true;
        additional_info: string; //"Facilis autem esse illum doloremque.";
        base_price: number; //6.43;
        deleted_at: string | null;
        created_at: string; //"2025-04-24T08:03:38.000000Z";
        updated_at: string; //"2025-04-24T08:03:38.000000Z";
        vehicle: {
          brand: {
            id: number;
            title: string;
            icon: null | string;
            deleted_at: null | string;
            created_at: string;
            updated_at: string;
            image: string;
            media: [];
          };
          id: number; //3;
          category_id: number; //1;
          brand_id: number; //4;
          user_id: number; //3;
          model: string; //"fuga";
          color: string; //"lime";
          plate_license: string; //"ZZ836QF";
          numb_free_seats: number; //3;
          smoke_allowed: boolean; //true;
          pet_allowed: boolean; //true;
          music_availability: boolean; //true;
          can_share_ride: number; //0;
          childseat_availability: boolean; //false;
          size_of_luggages: string; //"medium";
          numb_of_luggages: number; //3;
          numb_of_childseats: number; //0;
          deleted_at: null | string;
          created_at: string; //"2025-04-24T08:02:34.000000Z";
          updated_at: string; //"2025-04-24T08:02:34.000000Z";
          image: string[];
          media: {
            id: number; //16;
            model_type: string; //"App\\Models\\Vehicle";
            model_id: string; //"3";
            uuid: string; //"5979b76e-f1ce-4b21-a4a8-35d1ea8d2bf2";
            collection_name: string; //"vehicle_images";
            name: string; //"BMW-PNG-High-Quality-Image";
            file_name: string; //"BMW-PNG-High-Quality-Image.png";
            mime_type: string; //"image/png";
            disk: string; //"b2";
            conversions_disk: string; //"b2";
            size: number; //294789;
            manipulations: [];
            custom_properties: [];
            generated_conversions: [];
            responsive_images: [];
            order_column: number; //1;
            created_at: string; //"2025-04-24T08:02:36.000000Z";
            updated_at: string; //"2025-04-24T08:02:36.000000Z";
            original_url: string; //"https://s3.us-east-005.backblazeb2.com/TinyParrot/16/BMW-PNG-High-Quality-Image.png";
            preview_url: string; //"";
          }[];
        };
      };
    };
    driver: {
      id: number; //3;
      first_name: string; //"Delpha";
      last_name: string; //"Ankunding";
      email: string; // "user3@example.com";
      mobile: null | string;
      city: null | string;
      email_verified_at: string; //"2025-04-24 15:01:23";
      avatar: null | string;
      is_driver: number; //1;
      can_share_ride: number; // 0;
      gender: null | string;
      deleted_at: null | string;
      created_at: string; // "2025-04-24 08:01:25";
      updated_at: string; // "2025-04-24 08:03:38";
      profile: {
        id: number; //3;
        mobile_is_show: boolean; //false;
        bio: string; //"Aut adipisci est commodi minima quia.";
        information: string; //"Eum illum facilis et. Voluptatem cum dolorem laboriosam porro. Amet consequatur eligendi debitis est tempora voluptates eveniet. Earum ut rerum consequatur repellat consectetur dolor tenetur.";
        deleted_at: string | null;
        created_at: string; //"2025-04-24T08:01:29.000000Z";
        updated_at: string; //"2025-04-24T08:01:29.000000Z";
      };
    };
    passenger: {
      id: number; //1;
      first_name: string; //"Mateo";
      last_name: string; //"Hamill";
      email: string; //"user@example.com";
      mobile: null | string;
      city: null | string;
      email_verified_at: string; //"2025-04-24 15:01:23";
      avatar: null | string;
      is_driver: number; //1;
      can_share_ride: number; //0;
      gender: null | string;
      deleted_at: null;
      created_at: string; //"2025-04-24 08:01:24";
      updated_at: string; //"2025-04-24 08:03:37";
      profile: {
        id: number; //1;
        mobile_is_show: boolean; //false;
        bio: string; //"Rerum alias in voluptates sunt vero iure.";
        information: string; //"Debitis qui beatae quia doloribus vitae veniam quia. Non et qui molestiae eos aut qui. Atque inventore est necessitatibus incidunt autem quas sapiente. Laudantium in assumenda laboriosam laborum temporibus sint.";
        deleted_at: null | string;
        created_at: string; //"2025-04-24T08:01:29.000000Z";
        updated_at: string; //"2025-04-24T08:01:29.000000Z";
      };
    };
  }[];

  redirect: null;
}

export interface GetMessagesListByRoomErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
