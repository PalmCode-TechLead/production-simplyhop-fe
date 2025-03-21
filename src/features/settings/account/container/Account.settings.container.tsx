import * as React from "react";
import clsx from "clsx";
import { FormAccountSettings } from "../fragments/form";
import { CTAAccountSettings } from "../fragments/cta/CTA.account.settings";

export const AccountSettingsContainer = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <FormAccountSettings />

      <CTAAccountSettings />
    </div>
  );
};
