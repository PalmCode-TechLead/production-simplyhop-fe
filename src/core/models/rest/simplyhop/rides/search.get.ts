import { NextApiRequest, NextApiResponse } from "next";

export interface GetRidesSearchRequestInterface extends NextApiRequest {
  payload?: GetRidesSearchPayloadRequestInterface;
}

export interface GetRidesSearchPayloadRequestInterface {
  params?: GetRidesSearchParamsPayloadRequestInterface;
}

export type GetRidesSearchParamsPayloadRequestInterface = {
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

export type GetRidesSearchResponseInterface = NextApiResponse<
  GetRidesSearchSuccessResponseInterface | GetRidesSearchErrorResponseInterface
>;

export interface GetRidesSearchSuccessResponseInterface {
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

export interface GetRidesSearchErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
