import * as React from "react";
import clsx from "clsx";
import { FormAccountSupport } from "../fragments/form";
import { CTAAccountSupport } from "../fragments/cta/CTA.account.support";
import { DeactivateAccountSupport } from "../fragments/deactivate";

export const AccountSupportContainer = () => {
  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <FormAccountSupport />

        <CTAAccountSupport />
      </div>
      <DeactivateAccountSupport />
    </>
  );
};
