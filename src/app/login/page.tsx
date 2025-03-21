import { AppContainer } from "@/core/modules/app/container";
import { LoginAuthContainer } from "@/features/auth/login/container";
import { LoginAuthProvider } from "@/features/auth/login/context";
import { ChatTripContainer } from "@/features/trip/chat/container";

export default function LoginPage() {
  return (
    <LoginAuthProvider>
      <LoginAuthContainer />
    </LoginAuthProvider>
  );
}
