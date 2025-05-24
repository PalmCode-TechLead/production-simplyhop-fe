import {
  PaymentSupportActionEnum,
  PaymentSupportActions,
  PaymentSupportSubscription,
} from "./Payment.support.types";

// Subscription
export const PaymentSupportSubscriptionReducers = (
  state: PaymentSupportSubscription,
  action: PaymentSupportActions
) => {
  switch (action.type) {
    case PaymentSupportActionEnum.SetSubscriptionData:
      return action.payload;
    case PaymentSupportActionEnum.SetSubscriptionStatusData:
      return {
        ...state,
        status: action.payload,
      };
    case PaymentSupportActionEnum.SetSubscriptionPortalData:
      return {
        ...state,
        portal: action.payload,
      };
    default:
      return state;
  }
};
