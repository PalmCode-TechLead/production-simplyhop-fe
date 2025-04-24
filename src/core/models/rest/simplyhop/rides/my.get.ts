import { NextApiRequest, NextApiResponse } from "next";

export interface GetRidesMyRequestInterface extends NextApiRequest {
  payload?: GetRidesMyPayloadRequestInterface;
}

export interface GetRidesMyPayloadRequestInterface {
  params?: GetRidesMyParamsPayloadRequestInterface;
}

export type GetRidesMyParamsPayloadRequestInterface = {
  "filter[rideTime.departure_time__lte]"?: string;
  "filter[rideTime.departure_time__gte]"?: string;
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
    vehicle: {
      id: 1;
      model: "ipsum";
      color: "maroon";
      plate_license: "ET359CI";
      numb_free_seats: 3;
      smoke_allowed: false;
      pet_allowed: true;
      music_availability: false;
      can_share_ride: 0;
      childseat_availability: false;
      size_of_luggages: "medium";
      numb_of_luggages: 3;
      numb_of_childseats: 0;
      deleted_at: null;
      created_at: "2025-04-22T03:45:17.000000Z";
      updated_at: "2025-04-22T03:45:17.000000Z";
      image: string[];
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
        id: 14;
        model_type: "App\\Models\\Vehicle";
        model_id: "1";
        uuid: "608ab403-a472-4923-bc7b-88d0b102d271";
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
        created_at: "2025-04-22T03:45:20.000000Z";
        updated_at: "2025-04-22T03:45:20.000000Z";
        original_url: "https://s3.us-east-005.backblazeb2.com/TinyParrot/14/BMW-PNG-High-Quality-Image.png";
        preview_url: "";
      }[];
    };
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
