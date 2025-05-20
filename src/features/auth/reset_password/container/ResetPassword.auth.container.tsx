"use client";
import * as React from "react";
import clsx from "clsx";
import { FormResetPasswordAuth } from "../fragments/form";
import { ResetPasswordAuthContext } from "../context";
import { SuccessResetPasswordAuth } from "../fragments/success";

export const ResetPasswordAuthContainer = () => {
  const { state } = React.useContext(ResetPasswordAuthContext);
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center w-full h-full"
      )}
    >
      {state.state.step === "success" ? (
        <SuccessResetPasswordAuth />
      ) : (
        <FormResetPasswordAuth />
      )}
    </div>
  );
};
