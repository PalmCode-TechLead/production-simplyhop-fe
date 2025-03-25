import { RegistrationProfileContainer } from "@/features/profile/registration/container";
import { RegistrationProfileProvider } from "@/features/profile/registration/context";
import * as React from "react";

export default function RegistrationProfilePage() {
  return (
    <RegistrationProfileProvider>
      <RegistrationProfileContainer />
    </RegistrationProfileProvider>
  );
}
