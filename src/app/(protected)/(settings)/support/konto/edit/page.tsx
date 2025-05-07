import { AlertApp } from "@/core/modules/app/fragments/alert";
import { AccountUpdateSupportContainer } from "@/features/support/account_update/container";
import { AccountUpdateSupportProvider } from "@/features/support/account_update/context";

export default function AccountUpdatePage() {
  return (
    <AccountUpdateSupportProvider>
      <AccountUpdateSupportContainer />
      <AlertApp />
    </AccountUpdateSupportProvider>
  );
}
