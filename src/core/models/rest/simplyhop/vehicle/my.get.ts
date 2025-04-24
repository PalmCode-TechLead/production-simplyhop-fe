import { Vehicle } from "@/core/models/data";
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
  data: Vehicle[];

  redirect: null;
}

export interface GetVehicleMyErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
