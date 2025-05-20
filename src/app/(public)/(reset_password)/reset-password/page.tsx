import { AlertApp } from "@/core/modules/app/fragments/alert";
import { ResetPasswordAuthContainer } from "@/features/auth/reset_password/container";
import { ResetPasswordAuthProvider } from "@/features/auth/reset_password/context";

export default function ResetPasswordPage() {
  return (
    <ResetPasswordAuthProvider>
      <ResetPasswordAuthContainer />
      <AlertApp />
    </ResetPasswordAuthProvider>
  );
}
