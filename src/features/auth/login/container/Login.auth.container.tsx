import * as React from "react";
import clsx from "clsx";
import { FormLoginAuth } from "../fragments/form";

export const LoginAuthContainer = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center w-full h-full"
      )}
    >
      <FormLoginAuth />
    </div>
  );
};
