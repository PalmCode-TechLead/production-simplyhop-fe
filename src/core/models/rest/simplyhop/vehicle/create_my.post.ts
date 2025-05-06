import { NextApiRequest, NextApiResponse } from "next";

export interface PostVehicleCreateMyRequestInterface extends NextApiRequest {
  payload?: PostVehicleCreateMyPayloadRequestInterface;
}

export interface PostVehicleCreateMyPayloadRequestInterface {
  body: FormData;
}

export type PostVehicleCreateMyBodyRequestInterface = {
  category_id: number;
  brand_id: number;
  model: string;
  color: string;
  plate_license: string;
  numb_free_seats: number;
  smoke_allowed: boolean;
  pet_allowed: boolean;
  music_availability: boolean;
  // childseat_availability: boolean;
  numb_of_childseats: number;
  numb_of_luggages: number;
  size_of_luggages: string;
  "image[]": File[];
};

export type PostVehicleCreateMyResponseInterface = NextApiResponse<
  | PostVehicleCreateMySuccessResponseInterface
  | PostVehicleCreateMyErrorResponseInterface
>;

export interface PostVehicleCreateMySuccessResponseInterface {
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

export interface PostVehicleCreateMyErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
