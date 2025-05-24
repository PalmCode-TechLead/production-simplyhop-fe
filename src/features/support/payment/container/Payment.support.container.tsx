import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { PackagesPaymentSupport } from "../fragments/packages";
import { SubscriptionsPaymentSupport } from "../fragments/subscriptions";

export const PaymentSupportContainer = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full",
          "px-[1.5rem] py-[1.5rem]",
          "relative",
          "border border-[#D3E7CE]",
          "rounded-[1.25rem]"
        )}
      >
        <h1 className={clsx("text-[1.5rem] font-bold text-[#292929]")}>
          {dictionaries.title}
        </h1>

        <PackagesPaymentSupport />
        <SubscriptionsPaymentSupport />
      </div>
    </div>
  );
};
