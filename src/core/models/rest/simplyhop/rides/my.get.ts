import { NextApiRequest, NextApiResponse } from "next";

export interface GetRidesMyRequestInterface extends NextApiRequest {
  payload?: GetRidesMyPayloadRequestInterface;
}

export interface GetRidesMyPayloadRequestInterface {
  params?: GetRidesMyParamsPayloadRequestInterface;
}

export type GetRidesMyParamsPayloadRequestInterface = {
  start_lat?: number;
  start_long?: number;
  destination_lat?: number;
  destination_long?: number;
  "filter[departure_time]"?: string;

  //mandatory
  include?: string;
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

export interface GetRidesMyErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
