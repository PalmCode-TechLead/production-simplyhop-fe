import * as React from "react";
import clsx from "clsx";
import { LegalHelpCenterSupport } from "../fragments/legal";

export const HelpCenterSupportContainer = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start",
        "w-full h-full",
        "relative"
      )}
    >
      <LegalHelpCenterSupport />
    </div>
  );
};
