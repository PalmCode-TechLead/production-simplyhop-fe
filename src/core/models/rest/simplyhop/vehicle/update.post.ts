import { NextApiRequest, NextApiResponse } from "next";

export interface PostVehicleUpdateRequestInterface extends NextApiRequest {
  payload?: PostVehicleUpdatePayloadRequestInterface;
}

export interface PostVehicleUpdatePayloadRequestInterface {
  path: PutVehicleUpdatePathPayloadRequestInterface;
  body: FormData;
}

export interface PutVehicleUpdatePathPayloadRequestInterface {
  id: string;
}

export type PostVehicleUpdateBodyRequestInterface = {
  category_id: number;
  brand_id: number;
  model: string;
  color: string;
  plate_license: string;
  numb_free_seats: number;
  smoke_allowed: boolean;
  pet_allowed: boolean;
  music_availability: boolean;
  childseat_availability: boolean;
  numb_of_childseats: number;
  numb_of_luggages: number;
  size_of_luggages: string;
  "image[]": File[];
};

export type PostVehicleUpdateResponseInterface = NextApiResponse<
  | PostVehicleUpdateSuccessResponseInterface
  | PostVehicleUpdateErrorResponseInterface
>;

export interface PostVehicleUpdateSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    token: string;
    token_type: string;
    user: {
      id: number;
      name: string;
      email: string;
      avatar: string;
      email_verified_at: string;
      created_at: string;
      updated_at: string;
    };
  };
  redirect: null;
}

export interface PostVehicleUpdateErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
