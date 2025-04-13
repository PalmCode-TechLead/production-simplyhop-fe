import { AccountUpdateSupportContainer } from "@/features/support/account_update/container";
import { AccountUpdateSupportProvider } from "@/features/support/account_update/context";

export default function AccountUpdatePage() {
  return (
    <AccountUpdateSupportProvider>
      <AccountUpdateSupportContainer />
    </AccountUpdateSupportProvider>
  );
}
