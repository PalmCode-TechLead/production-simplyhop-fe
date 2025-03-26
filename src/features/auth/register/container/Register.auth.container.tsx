"use client";
import * as React from "react";
import clsx from "clsx";
import { GeneralRegisterAuth } from "../fragments/general";
import { RegisterAuthContext } from "../context";
import { PasswordSetupRegisterAuth } from "../fragments/password_setup";

export const RegisterAuthContainer = () => {
  const { state } = React.useContext(RegisterAuthContext);
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center w-full h-full"
      )}
    >
      {state.state.step === "password_setup" ? (
        <PasswordSetupRegisterAuth />
      ) : (
        <GeneralRegisterAuth />
      )}
    </div>
  );
};
