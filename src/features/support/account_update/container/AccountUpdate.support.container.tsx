import * as React from "react";
import clsx from "clsx";
import { FormAccountUpdateSupport } from "../fragments/form";
import { CTAAccountUpdateSupport } from "../fragments/cta/CTA.account_update.support";
import { DeactivateAccountUpdateSupport } from "../fragments/deactivate";
import { DeactivateConfirmationAccountUpdateSupport } from "../fragments/deactivate_confirmation";
import { DeactivateNotificationAccountUpdateSupport } from "../fragments/deactivate_notification";
import { PictureFormAccountUpdateSupport } from "../fragments/picture_form";

export const AccountUpdateSupportContainer = () => {
  return (
    <>
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
          <FormAccountUpdateSupport />
          <PictureFormAccountUpdateSupport />
        </div>

        <CTAAccountUpdateSupport />
      </div>
      <DeactivateAccountUpdateSupport />
      <DeactivateConfirmationAccountUpdateSupport />
      <DeactivateNotificationAccountUpdateSupport />
    </>
  );
};
