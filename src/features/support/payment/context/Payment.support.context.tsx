"use client";
import React, { createContext, useReducer, Dispatch, useEffect } from "react";
import {
  PaymentSupportActionEnum,
  PaymentSupportActions,
  PaymentSupportInitialStateType,
} from "./Payment.support.types";
import { PaymentSupportSubscriptionReducers } from "./Payment.support.reducers";
import {
  useGetPaymentBillingPortal,
  useGetPaymentStatus,
} from "../react_query/hooks";

const initialState: PaymentSupportInitialStateType = {
  subscription: {
    status: null,
    portal: {
      link: null,
    },
  },
};

const PaymentSupportContext = createContext<{
  state: PaymentSupportInitialStateType;
  dispatch: Dispatch<PaymentSupportActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { subscription }: PaymentSupportInitialStateType,
  action: PaymentSupportActions
) => ({
  subscription: PaymentSupportSubscriptionReducers(subscription, action),
});

const PaymentSupportProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const paymentStatusQuery = useGetPaymentStatus();
  useEffect(() => {
    if (!!paymentStatusQuery.data && !paymentStatusQuery.isFetching) {
      const data = paymentStatusQuery.data;
      dispatch({
        type: PaymentSupportActionEnum.SetSubscriptionStatusData,
        payload: data.active,
      });
    }
  }, [paymentStatusQuery.data, paymentStatusQuery.isFetching]);

  const paymentBillingPortalQuery = useGetPaymentBillingPortal({
    enabled: !!state.subscription.status,
  });
  useEffect(() => {
    if (
      !!paymentBillingPortalQuery.data &&
      !paymentBillingPortalQuery.isFetching
    ) {
      const data = paymentBillingPortalQuery.data;
      dispatch({
        type: PaymentSupportActionEnum.SetSubscriptionPortalData,
        payload: {
          ...state.subscription.portal,
          link: data.url,
        },
      });
    }
  }, [paymentBillingPortalQuery.data, paymentBillingPortalQuery.isFetching]);
  return (
    <PaymentSupportContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PaymentSupportContext.Provider>
  );
};

export { PaymentSupportProvider, PaymentSupportContext };
