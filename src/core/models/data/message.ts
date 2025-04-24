import { Booking } from "./booking";
import { MessageContent } from "./message_content";
import { User } from "./user";

export interface Message {
  id: number; //1;
  message_room_id: number; //1;
  ride_booking_id: number; //1;
  sender_id: number; //1;
  passenger_id: number; //1;
  driver_id: number; //2;
  contents: MessageContent | string; //'{"type":"offer_request","message":"The passenger has booked a ride and offered a price of 60","booking_id":1,"offered_price":60}';
  read_at_driver: boolean | null;
  read_at_passenger: boolean | null;
  deleted_at: string | null;
  created_at: string; //"2025-04-22T03:47:51.000000Z";
  updated_at: string; //"2025-04-22T03:47:51.000000Z";
  booking?: Booking;
  driver?: User;
  passenger?: User;
}
