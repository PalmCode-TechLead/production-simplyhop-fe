import { NextApiRequest, NextApiResponse } from "next";

export interface GetBookingMyRequestInterface extends NextApiRequest {
  payload?: GetBookingMyPayloadRequestInterface;
}

export interface GetBookingMyPayloadRequestInterface {
  params?: GetBookingMyParamsPayloadRequestInterface;
}

export type GetBookingMyParamsPayloadRequestInterface = {
  start_lat?: number;
  start_long?: number;
  destination_lat?: number;
  destination_long?: number;
  "filter[departure_time]"?: string;
  include?: string;
  //mandatory
  sort?: string;
  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetBookingMyResponseInterface = NextApiResponse<
  GetBookingMySuccessResponseInterface | GetBookingMyErrorResponseInterface
>;

export interface GetBookingMySuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    id: 1;
    user_id: 1;
    ride_id: 2;
    ride_time_id: 2;
    status: "pending";
    payment_status: "pending";
    total_amount: null;
    seats: 2;
    child_seats: 0;
    deleted_at: null;
    created_at: "2025-04-22T03:47:51.000000Z";
    updated_at: "2025-04-22T03:47:51.000000Z";
    ride: {
      id: 2;
      user_id: 2;
      unique_code: null;
      vehicle_id: 2;
      start_lat: 52.4809876;
      start_long: 13.365431;
      start_name: "Berlin";
      destination_lat: 48.1431823;
      destination_long: 11.5692344;
      destination_name: "München";
      eta: 21600;
      recurring_ride: "no";
      waiting_time: "5 mins";
      luggage_allowed: true;
      maxtwo_backseat: false;
      additional_info: "Quia ut neque voluptate minus et saepe officiis.";
      base_price: 40.68;
      deleted_at: null;
      created_at: "2025-04-22T03:46:40.000000Z";
      updated_at: "2025-04-22T03:46:40.000000Z";
      vehicle: {
        id: 2;
        model: "possimus";
        color: "white";
        plate_license: "UZ834XB";
        numb_free_seats: 5;
        smoke_allowed: false;
        pet_allowed: true;
        music_availability: false;
        can_share_ride: 0;
        childseat_availability: true;
        size_of_luggages: "small";
        numb_of_luggages: 3;
        numb_of_childseats: 2;
        deleted_at: null;
        created_at: "2025-04-22T03:45:21.000000Z";
        updated_at: "2025-04-22T03:45:21.000000Z";
        image: [
          "https://s3.us-east-005.backblazeb2.com/TinyParrot/15/BMW-PNG-High-Quality-Image.png"
        ];
        brand: {
          id: 7;
          title: "Chevrolet";
          deleted_at: null;
          created_at: "2025-04-22T03:45:01.000000Z";
          updated_at: "2025-04-22T03:45:01.000000Z";
          image: "https://s3.us-east-005.backblazeb2.com/TinyParrot/10/Mercedes-Logo.svg.png";
          media: {
            id: 10;
            model_type: "App\\Models\\VehicleBrand";
            model_id: "7";
            uuid: "d112fc11-3264-4fd0-9052-61c3dd8246a4";
            collection_name: "brand_icon";
            name: "Mercedes-Logo.svg";
            file_name: "Mercedes-Logo.svg.png";
            mime_type: "image/png";
            disk: "b2";
            conversions_disk: "b2";
            size: 714880;
            manipulations: [];
            custom_properties: [];
            generated_conversions: [];
            responsive_images: [];
            order_column: 1;
            created_at: "2025-04-22T03:45:04.000000Z";
            updated_at: "2025-04-22T03:45:04.000000Z";
            original_url: "https://s3.us-east-005.backblazeb2.com/TinyParrot/10/Mercedes-Logo.svg.png";
            preview_url: "";
          }[];
        };
        media: {
          id: 15;
          model_type: "App\\Models\\Vehicle";
          model_id: "2";
          uuid: "7068dd53-cadc-4f62-82f9-268ba8e59194";
          collection_name: "vehicle_images";
          name: "BMW-PNG-High-Quality-Image";
          file_name: "BMW-PNG-High-Quality-Image.png";
          mime_type: "image/png";
          disk: "b2";
          conversions_disk: "b2";
          size: 294789;
          manipulations: [];
          custom_properties: [];
          generated_conversions: [];
          responsive_images: [];
          order_column: 1;
          created_at: "2025-04-22T03:45:23.000000Z";
          updated_at: "2025-04-22T03:45:23.000000Z";
          original_url: "https://s3.us-east-005.backblazeb2.com/TinyParrot/15/BMW-PNG-High-Quality-Image.png";
          preview_url: "";
        }[];
      };
    };
    ride_time: {
      id: 2;
      available_seats: 4;
      available_child_seats: 1;
      departure_time: "2025-04-28T04:00:00.000000Z";
      deleted_at: null;
      created_at: "2025-04-22T03:46:40.000000Z";
      updated_at: "2025-04-22T03:46:40.000000Z";
    };
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
  }[];

  redirect: null;
}

export interface GetBookingMyErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
