import { NextApiRequest, NextApiResponse } from "next";

export interface DeleteVehicleIdRequestInterface extends NextApiRequest {
  payload: DeleteVehicleIdPayloadRequestInterface;
}

export interface DeleteVehicleIdPayloadRequestInterface {
  path: DeleteVehicleIdPathPayloadRequestInterface;
}

export interface DeleteVehicleIdPathPayloadRequestInterface {
  vehicle_id: string;
}

export type DeleteVehicleIdResponseInterface = NextApiResponse<
  | DeleteVehicleIdSuccessResponseInterface
  | DeleteVehicleIdErrorResponseInterface
>;

export interface DeleteVehicleIdSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: null;

  redirect: null;
}

export interface DeleteVehicleIdErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
