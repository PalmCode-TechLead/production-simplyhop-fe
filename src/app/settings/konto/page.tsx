import { AccountSettingsContainer } from "@/features/settings/account/container";
import { AccountSettingsProvider } from "@/features/settings/account/context";

export default function ProfilePage() {
  return (
    <AccountSettingsProvider>
      <AccountSettingsContainer />
    </AccountSettingsProvider>
  );
}
