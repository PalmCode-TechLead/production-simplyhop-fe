import { MessageRoom } from "./message_room";
import { Ride } from "./ride";
import { User } from "./user";

export interface Booking {
  id: number; //2;
  user_id: number; //1;
  ride_id: number; //3;
  ride_time_id: number; //3;
  status: string; //"pending";
  payment_status: string; //"pending";
  total_amount: number; //12.86;
  offered_price: number; //20;
  seats: number; //2;
  child_seats: number; //0;
  deleted_at: null | string;
  created_at: string; // "2025-04-24T08:04:22.000000Z";
  updated_at: string; //"2025-04-24T08:04:22.000000Z";
  ride?: Ride;
  user?: User;
  message_room?: MessageRoom;
}
