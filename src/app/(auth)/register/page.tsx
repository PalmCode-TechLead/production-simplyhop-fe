import { RegisterAuthContainer } from "@/features/auth/register/container";
import { RegisterAuthProvider } from "@/features/auth/register/context";

export default function RegisterPage() {
  return (
    <RegisterAuthProvider>
      <RegisterAuthContainer />
    </RegisterAuthProvider>
  );
}
