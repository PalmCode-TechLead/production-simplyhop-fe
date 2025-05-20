"use client";
import * as React from "react";
import clsx from "clsx";
import { FormForgotPasswordAuth } from "../fragments/form";
import { ForgotPasswordAuthContext } from "../context";
import { SuccessForgotPasswordAuth } from "../fragments/success";

export const ForgotPasswordAuthContainer = () => {
  const { state } = React.useContext(ForgotPasswordAuthContext);
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center w-full h-full"
      )}
    >
      {state.state.step === "success" ? (
        <SuccessForgotPasswordAuth />
      ) : (
        <FormForgotPasswordAuth />
      )}
    </div>
  );
};
