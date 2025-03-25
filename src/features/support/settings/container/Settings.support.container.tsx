"use client";
import * as React from "react";
import clsx from "clsx";
import { AccountSettingsSupport } from "../fragments/account";
import { SecuritySettingsSupport } from "../fragments/security";
import { DeactivateSettingsSupport } from "../fragments/deactivate";

export const SettingsSupportContainer = () => {
  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
          "w-full h-full",
          "relative"
        )}
      >
        <SecuritySettingsSupport />
        <AccountSettingsSupport />
      </div>
      <DeactivateSettingsSupport />
    </>
  );
};
