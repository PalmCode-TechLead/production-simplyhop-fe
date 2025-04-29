import { VehicleBrand, VehicleCategory } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetVehicleIdRequestInterface extends NextApiRequest {
  payload: GetVehicleIdPayloadRequestInterface;
}

export interface GetVehicleIdPayloadRequestInterface {
  params?: GetVehicleIdParamsPayloadRequestInterface;
  path: GetVehicleIdPathPayloadRequestInterface;
}

export interface GetVehicleIdPathPayloadRequestInterface {
  id: number;
}

export type GetVehicleIdParamsPayloadRequestInterface = {
  include?: string;
  append?: string;
};

export type GetVehicleIdResponseInterface = NextApiResponse<
  GetVehicleIdSuccessResponseInterface | GetVehicleIdErrorResponseInterface
>;

export interface GetVehicleIdSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    id: number; // 1;
    category_id: number; // 1;
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
    brand: VehicleBrand | null;
    category: VehicleCategory | null;
  };

  redirect: null;
}

export interface GetVehicleIdErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
