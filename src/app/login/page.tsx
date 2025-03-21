import { LoginAuthContainer } from "@/features/auth/login/container";
import { LoginAuthProvider } from "@/features/auth/login/context";

export default function LoginPage() {
  return (
    <LoginAuthProvider>
      <LoginAuthContainer />
    </LoginAuthProvider>
  );
}
