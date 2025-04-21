import { NextApiRequest, NextApiResponse } from "next";

export interface GetVehicleMyRequestInterface extends NextApiRequest {
  payload?: GetVehicleMyPayloadRequestInterface;
}

export interface GetVehicleMyPayloadRequestInterface {
  params?: GetVehicleMyParamsPayloadRequestInterface;
}

export type GetVehicleMyParamsPayloadRequestInterface = {
  include?: string;
  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetVehicleMyResponseInterface = NextApiResponse<
  GetVehicleMySuccessResponseInterface | GetVehicleMyErrorResponseInterface
>;

export interface GetVehicleMySuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    id: number; // 1;
    model: string; //"qui";
    color: string; //"purple";
    plate_license: string; //"SA317CO";
    numb_free_seats: number;
    smoke_allowed: boolean;
    pet_allowed: boolean;
    music_availability: boolean;
    childseat_availability: boolean;
    numb_of_childseats: number;
    numb_of_luggages: null | number;
    size_of_luggages: null | number;
    deleted_at: null;
    created_at: string; //"2025-04-21T14:33:00.000000Z";
    updated_at: string; //"2025-04-21T14:33:00.000000Z";
    image: string[];
    media: {
      id: number; //14;
      model_type: string; //"App\\Models\\Vehicle";
      model_id: string; //"1";
      uuid: string; //"00e7b553-ae62-49fd-96cd-b83367a19eda";
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
      created_at: string; //"2025-04-21T14:33:02.000000Z";
      updated_at: string; //"2025-04-21T14:33:02.000000Z";
      original_url: string; // "https://s3.us-east-005.backblazeb2.com/TinyParrot/14/BMW-PNG-High-Quality-Image.png";
      preview_url: string; // "";
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
  }[];

  redirect: null;
}

export interface GetVehicleMyErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
