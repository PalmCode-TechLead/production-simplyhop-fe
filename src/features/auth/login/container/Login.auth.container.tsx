import * as React from "react";
import clsx from "clsx";
import { FormLoginAuth } from "../fragments/form";

export const LoginAuthContainer = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center",
        "w-full h-full min-h-[100vh]",
        "relative"
      )}
      style={{
        backgroundImage: `url('/images/auth/auth-bg.png')`,
        backgroundPosition: "cover",
      }}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center w-full h-full"
        )}
      >
        <FormLoginAuth />
      </div>
    </div>
  );
};
