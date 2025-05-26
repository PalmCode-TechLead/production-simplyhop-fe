type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface PaymentSupportInitialStateType {
  subscription: PaymentSupportSubscription;
}

// State Collection Types consist of:
export interface PaymentSupportSubscription {
  status: null | boolean;
  portal: {
    link: string | null;
  };
}

export enum PaymentSupportActionEnum {
  // Subscription
  SetSubscriptionData = "SetSubscriptionData",
  SetSubscriptionStatusData = "SetSubscriptionStatusData",
  SetSubscriptionPortalData = "SetSubscriptionPortalData",
}

// Action Collection Types
export type PaymentSupportActions = PaymentSupportSubscriptionActions;

// Action Collection Types consist of:
// Subscription
type PaymentSupportSubscriptionPayload = {
  [PaymentSupportActionEnum.SetSubscriptionData]: PaymentSupportSubscription;
  [PaymentSupportActionEnum.SetSubscriptionStatusData]: PaymentSupportSubscription["status"];
  [PaymentSupportActionEnum.SetSubscriptionPortalData]: PaymentSupportSubscription["portal"];
};

export type PaymentSupportSubscriptionActions =
  ActionMap<PaymentSupportSubscriptionPayload>[keyof ActionMap<PaymentSupportSubscriptionPayload>];
