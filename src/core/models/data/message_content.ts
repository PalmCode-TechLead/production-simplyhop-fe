export interface MessageContent {
  type: string; //"offer_request";
  message: string; //"The passenger has booked a ride and offered a price of 20. ";
  total_amount: number; //12.86;
  offered_price: number; //20;
}
