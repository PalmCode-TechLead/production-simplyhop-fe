import { VehicleBrand } from "./vehicle_brand";
import { VehicleCategory } from "./vehicle_category";
import { VehicleMedia } from "./vehicle_media";

export interface Vehicle {
  id: number; // 1;
  model: string | null; //"qui";
  color: string | null; //"purple";
  plate_license: string; //"SA317CO";
  numb_free_seats: number | null;
  smoke_allowed: boolean | null;
  pet_allowed: boolean | null;
  music_availability: boolean | null;
  childseat_availability: boolean | null;
  numb_of_childseats: number | null;
  numb_of_luggages: null | number;
  size_of_luggages: null | number;
  deleted_at: null;
  created_at: string; //"2025-04-21T14:33:00.000000Z";
  updated_at: string; //"2025-04-21T14:33:00.000000Z";
  image: string[];
  can_share_ride: number | null;
  media?: VehicleMedia[];
  brand?: VehicleBrand;
  category?: VehicleCategory;
}
