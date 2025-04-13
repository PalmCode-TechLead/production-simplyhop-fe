import * as React from "react";
import clsx from "clsx";
import { FormAccountUpdateSupport } from "../fragments/form";
import { CTAAccountUpdateSupport } from "../fragments/cta/CTA.account_update.support";
import { DeactivateAccountUpdateSupport } from "../fragments/deactivate";
import { DeactivateConfirmationAccountUpdateSupport } from "../fragments/deactivate_confirmation";
import { DeactivateNotificationAccountUpdateSupport } from "../fragments/deactivate_notification";

export const AccountUpdateSupportContainer = () => {
  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <FormAccountUpdateSupport />

        <CTAAccountUpdateSupport />
      </div>
      <DeactivateAccountUpdateSupport />
      <DeactivateConfirmationAccountUpdateSupport />
      <DeactivateNotificationAccountUpdateSupport />
    </>
  );
};
