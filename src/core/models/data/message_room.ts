import { Booking } from "./booking";
import { Message } from "./message";
import { User } from "./user";

export interface MessageRoom {
  id: number; //1;
  ride_booking_id: number; //1;
  passenger_id: number; //1;
  driver_id: number; //2;
  is_passenger_read: number; //0;
  is_driver_read: number; //0;
  created_at: string; //"2025-04-22T03:47:51.000000Z";
  updated_at: string; //"2025-04-22T03:47:51.000000Z";
  driver_exists: boolean; //true;
  passenger_exists: boolean; //true;
  messages_exists: boolean; //true;
  messages?: Message[];
  passenger?: User;
  driver?: User;
  booking?: Booking;
}
