import { NextApiRequest, NextApiResponse } from "next";

export interface GetVehicleCategoryListRequestInterface extends NextApiRequest {
  payload?: GetVehicleCategoryListPayloadRequestInterface;
}

export interface GetVehicleCategoryListPayloadRequestInterface {
  path: GetVehicleCategoryListPathRequestInterface;
  params?: GetVehicleCategoryListParamsRequestInterface;
}

export type GetVehicleCategoryListPathRequestInterface = {
  id: string;
};

export type GetVehicleCategoryListParamsRequestInterface = {
  "filter[search]"?: string;
  "filter[status]"?: string;
  include?: string;
  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetVehicleCategoryListResponseInterface = NextApiResponse<
  | GetVehicleCategoryListSuccessResponseInterface
  | GetVehicleCategoryListErrorResponseInterface
>;

export interface GetVehicleCategoryListSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    id: number;
    title: string;
    image: string;
    created_at: string;
    updated_at: string;
    deleted_at: null | string;
    media: {
      id: number;
      model_type: string;
      model_id: string;
      uuid: string;
      collection_name: string;
      name: string;
      file_name: string;
      mime_type: string;
      disk: string;
      conversions_disk: string;
      size: number;
      manipulations: string[];
      custom_properties: string[];
      generated_conversions: string[];
      responsive_images: string[];
      order_column: number;
      created_at: string;
      updated_at: string;
      original_url: string;
      preview_url: string;
    }[];
  }[];

  redirect: null;
}

export interface GetVehicleCategoryListErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
