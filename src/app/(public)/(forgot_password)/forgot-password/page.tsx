import { AlertApp } from "@/core/modules/app/fragments/alert";
import { ForgotPasswordAuthContainer } from "@/features/auth/forgot_password/container";
import { ForgotPasswordAuthProvider } from "@/features/auth/forgot_password/context";

export default function ForgotPasswordPage() {
  return (
    <ForgotPasswordAuthProvider>
      <ForgotPasswordAuthContainer />
      <AlertApp />
    </ForgotPasswordAuthProvider>
  );
}
