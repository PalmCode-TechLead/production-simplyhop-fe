"use client";

import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { SubscriptionItemPaymentSupport } from "../../components/subscription_item";
import { SVGIconProps } from "@/core/icons";
import { PaymentSupportContext } from "../../context";
import { Divider } from "@/core/components/divider";

export const SubscriptionsPaymentSupport = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(PaymentSupportContext);

  if (!state.subscription.status) return null;

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <Divider />
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <h2 className={clsx("text-[1rem] text-[#1D1D1D] font-semibold")}>
          {dictionaries.subscription.title}
        </h2>
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
            "w-full",
            "py-[0.5rem]"
          )}
        >
          {dictionaries.subscription.menu.items.map(
            (subscriptionItem, index) => (
              <SubscriptionItemPaymentSupport
                key={index}
                {...subscriptionItem}
                icon={subscriptionItem.icon as SVGIconProps["name"]}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};
