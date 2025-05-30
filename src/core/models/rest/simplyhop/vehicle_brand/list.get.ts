import { VehicleBrand } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetVehicleBrandListRequestInterface extends NextApiRequest {
  payload?: GetVehicleBrandListPayloadRequestInterface;
}

export interface GetVehicleBrandListPayloadRequestInterface {
  params?: GetVehicleBrandListParamsRequestInterface;
}

export type GetVehicleBrandListParamsRequestInterface = {
  include?: string;
  search?: string;
  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetVehicleBrandListResponseInterface = NextApiResponse<
  | GetVehicleBrandListSuccessResponseInterface
  | GetVehicleBrandListErrorResponseInterface
>;

export interface GetVehicleBrandListSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: VehicleBrand[];
  redirect: null;
}

export interface GetVehicleBrandListErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
