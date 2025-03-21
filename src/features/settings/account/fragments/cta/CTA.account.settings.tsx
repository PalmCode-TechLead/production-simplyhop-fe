import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";

export const CTAAccountSettings = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-center justify-items-center",
        "w-full",
        "py-[1rem]"
      )}
    >
      <button className={clsx("text-[1rem] text-[#DA2323] font-medium")}>
        {dictionaries.cta.delete_account.children}
      </button>
    </div>
  );
};
