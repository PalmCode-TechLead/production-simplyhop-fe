import { NextApiRequest, NextApiResponse } from "next";

export interface DeleteRidesIdRequestInterface extends NextApiRequest {
  payload: DeleteRidesIdPayloadRequestInterface;
}

export interface DeleteRidesIdPayloadRequestInterface {
  path: DeleteRidesIdPathPayloadRequestInterface;
}

export interface DeleteRidesIdPathPayloadRequestInterface {
  id: string;
}

export type DeleteRidesIdResponseInterface = NextApiResponse<
  | DeleteRidesIdSuccessResponseInterface
  | DeleteRidesIdErrorResponseInterface
>;

export interface DeleteRidesIdSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: null;

  redirect: null;
}

export interface DeleteRidesIdErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
