import { VehicleCategory } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetVehicleCategoryListRequestInterface extends NextApiRequest {
  payload?: GetVehicleCategoryListPayloadRequestInterface;
}

export interface GetVehicleCategoryListPayloadRequestInterface {
  params?: GetVehicleCategoryListParamsRequestInterface;
}

export type GetVehicleCategoryListParamsRequestInterface = {
  search?: string;
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
  data: VehicleCategory[];

  redirect: null;
}

export interface GetVehicleCategoryListErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
