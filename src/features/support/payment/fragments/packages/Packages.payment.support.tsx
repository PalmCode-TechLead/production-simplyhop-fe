"use client";

import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import PackageItemPaymentSupport from "../../components/package_item/PackageItem.payment.support";
import { PaymentSupportContext } from "../../context";
import { Button } from "@/core/components/button";
import { useGetPaymentSubscribe } from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";

export const PackagesPaymentSupport = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(PaymentSupportContext);
  const { mutate: getSubscribe, isPending: isPendingGetSubscribe } =
    useGetPaymentSubscribe();
  const handleClickSubscribe = () => {
    getSubscribe();
  };

  const isSubmitDisabled = isPendingGetSubscribe;
  const isSubmitLoading = isPendingGetSubscribe;
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <PackageItemPaymentSupport
        {...dictionaries.package.premium}
        badge={{
          ...dictionaries.package.premium.badge,
          isShowed: state.subscription.status === true,
        }}
      />

      {state.subscription.status === false && (
        <Button
          onClick={handleClickSubscribe}
          disabled={isSubmitDisabled}
          isLoading={isSubmitLoading}
        >
          {isSubmitLoading && <MoonLoader size={20} color={"white"} />}
          {dictionaries.package.cta.subscribe.children}
        </Button>
      )}
    </div>
  );
};
