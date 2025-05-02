import { VehicleBrand } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PostVehicleBrandCreateRequestInterface extends NextApiRequest {
  payload?: PostVehicleBrandCreatePayloadRequestInterface;
}

export interface PostVehicleBrandCreatePayloadRequestInterface {
  body: FormData;
}

export type PostVehicleBrandCreateBodyRequestInterface = {
  title: string;
  icon?: File;
};

export type PostVehicleBrandCreateResponseInterface = NextApiResponse<
  | PostVehicleBrandCreateSuccessResponseInterface
  | PostVehicleBrandCreateErrorResponseInterface
>;

export interface PostVehicleBrandCreateSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: VehicleBrand;
  redirect: null;
}

export interface PostVehicleBrandCreateErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
