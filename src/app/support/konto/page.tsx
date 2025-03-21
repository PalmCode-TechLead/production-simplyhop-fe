import { AccountSupportContainer } from "@/features/support/account/container";
import { AccountSupportProvider } from "@/features/support/account/context";

export default function AccountPage() {
  return (
    <AccountSupportProvider>
      <AccountSupportContainer />
    </AccountSupportProvider>
  );
}
