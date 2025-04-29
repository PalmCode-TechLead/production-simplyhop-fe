import { NextApiRequest, NextApiResponse } from "next";

export interface DeleteVehicleMediaRequestInterface extends NextApiRequest {
  payload: DeleteVehicleMediaPayloadRequestInterface;
}

export interface DeleteVehicleMediaPayloadRequestInterface {
  path: DeleteVehicleMediaPathPayloadRequestInterface;
}

export interface DeleteVehicleMediaPathPayloadRequestInterface {
  vehicle_id: string;
  media_id: string;
}

export type DeleteVehicleMediaResponseInterface = NextApiResponse<
  | DeleteVehicleMediaSuccessResponseInterface
  | DeleteVehicleMediaErrorResponseInterface
>;

export interface DeleteVehicleMediaSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: null;

  redirect: null;
}

export interface DeleteVehicleMediaErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
