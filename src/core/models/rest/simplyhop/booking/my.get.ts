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
    id: number; // 10;
    user_id: number; // 10;
    unique_code: null | string;
    vehicle_id: number; // 10;
    start_lat: number; // 52.5092996;
    start_long: number; // 13.421813;
    destination_lat: number; // 48.1250433;
    destination_long: number; // 11.6209174;
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
    ride_times: {
      id: number; // 10;
      available_seats: number; // 1;
      departure_time: string; // "2025-04-22T10:00:00.000000Z";
      deleted_at: null | string;
      created_at: string; // "2025-04-21T07:24:52.000000Z";
      updated_at: string; // "2025-04-21T07:24:52.000000Z";
    }[];
    vehicle: {
      id: number; //10;
      model: string; // "recusandae";
      color: string; //"maroon";
      plate_license: string; //"WC707VW";
      total_places: number; //1;
      numb_free_seats: number; //2;
      smoke_allowed: boolean; //true;
      pet_allowed: boolean; //false;
      music_availability: boolean; //false;
      childseat_availability: boolean; //false;
      numb_of_childseat: null | number;
      numb_of_luggages: null | number;
      size_of_luggages: null | number;
      deleted_at: null;
      created_at: string; //"2025-04-21T07:24:13.000000Z";
      updated_at: string; //"2025-04-21T07:24:13.000000Z";
      image: string[];
      media: {
        id: number; //23;
        model_type: string; //"App\\Models\\Vehicle";
        model_id: string; //"10";
        uuid: string; // "bab12f3a-96d0-4538-909f-ada402d964e9";
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
        created_at: string; //"2025-04-21T07:24:15.000000Z";
        updated_at: string; //"2025-04-21T07:24:15.000000Z";
        original_url: string; //"https://s3.us-east-005.backblazeb2.com/TinyParrot/23/BMW-PNG-High-Quality-Image.png";
        preview_url: string; //"";
      }[];
      brand: {
        id: number; //3;
        title: string; //"Audi";
        deleted_at: null | string;
        created_at: string; //"2025-04-21T07:23:18.000000Z";
        updated_at: string; //"2025-04-21T07:23:18.000000Z";
        image: string; //"https://s3.us-east-005.backblazeb2.com/TinyParrot/6/Mercedes-Logo.svg.png";
        media: {
          id: number; //6;
          model_type: string; //"App\\Models\\VehicleBrand";
          model_id: string; //"3";
          uuid: string; //"f3759349-8117-4db5-8783-06e850794c25";
          collection_name: string; //"brand_icon";
          name: string; // "Mercedes-Logo.svg";
          file_name: string; //"Mercedes-Logo.svg.png";
          mime_type: string; //"image/png";
          disk: string; //"b2";
          conversions_disk: string; //"b2";
          size: number; //714880;
          manipulations: [];
          custom_properties: [];
          generated_conversions: [];
          responsive_images: [];
          order_column: number; //1;
          created_at: string; //"2025-04-21T07:23:20.000000Z";
          updated_at: string; //"2025-04-21T07:23:20.000000Z";
          original_url: string; //"https://s3.us-east-005.backblazeb2.com/TinyParrot/6/Mercedes-Logo.svg.png";
          preview_url: string; //"";
        }[];
      };
      category: {
        id: number; //3;
        title: string; //"MPV";
        deleted_at: null | string;
        created_at: string; //"2025-04-21T07:23:07.000000Z";
        updated_at: string; // "2025-04-21T07:23:07.000000Z";
        image: string; //"https://s3.us-east-005.backblazeb2.com/TinyParrot/3/Screenshot-2025-04-16-210946.png";
        media: {
          id: number; //3;
          model_type: string; //"App\\Models\\VehicleCategory";
          model_id: string; //"3";
          uuid: string; //"6f164700-a5f0-4e3f-82fb-d3896b7bfe28";
          collection_name: string; //"category_icon";
          name: string; //"Screenshot-2025-04-16-210946";
          file_name: string; //"Screenshot-2025-04-16-210946.png";
          mime_type: string; //"image/png";
          disk: string; //"b2";
          conversions_disk: string; //"b2";
          size: number; //7565;
          manipulations: [];
          custom_properties: [];
          generated_conversions: [];
          responsive_images: [];
          order_column: number; //1;
          created_at: string; //"2025-04-21T07:23:08.000000Z";
          updated_at: string; //"2025-04-21T07:23:08.000000Z";
          original_url: string; //"https://s3.us-east-005.backblazeb2.com/TinyParrot/3/Screenshot-2025-04-16-210946.png";
          preview_url: string; //"";
        }[];
      };
    };
    user: {
      id: number; //10;
      first_name: string; //"Kari";
      last_name: string; //"Bauch";
      email: string; //"user10@example.com";
      mobile: null | string;
      city: null | string;
      email_verified_at: string; //"2025-04-21 14:22:54";
      avatar: null | string;
      is_driver: number; //1;
      deleted_at: null | string;
      created_at: string; // "2025-04-21 07:22:57";
      updated_at: string; // "2025-04-21 07:24:52";
    };
  }[];

  redirect: null;
}

export interface GetBookingMyErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
