import * as React from "react";
import clsx from "clsx";
import { FormRegisterAuth } from "../fragments/form";

export const RegisterAuthContainer = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center w-full h-full"
      )}
    >
      <FormRegisterAuth />
    </div>
  );
};
