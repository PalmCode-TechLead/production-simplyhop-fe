import { NextApiRequest, NextApiResponse } from "next";

export interface PostVehicleCategoryCreateRequestInterface
  extends NextApiRequest {
  payload?: PostVehicleCategoryCreatePayloadRequestInterface;
}

export interface PostVehicleCategoryCreatePayloadRequestInterface {
  body: FormData;
}

export type PostVehicleCategoryCreateBodyRequestInterface = {
  title: string;
  icon?: File;
};

export type PostVehicleCategoryCreateResponseInterface = NextApiResponse<
  | PostVehicleCategoryCreateSuccessResponseInterface
  | PostVehicleCategoryCreateErrorResponseInterface
>;

export interface PostVehicleCategoryCreateSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: Object;
  redirect: null;
}

export interface PostVehicleCategoryCreateErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
