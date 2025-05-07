import { AlertApp } from "@/core/modules/app/fragments/alert";
import { SettingsSupportContainer } from "@/features/support/settings/container";
import { SettingsSupportProvider } from "@/features/support/settings/context";

export default function SettingsPage() {
  return (
    <SettingsSupportProvider>
      <SettingsSupportContainer />
      <AlertApp />
    </SettingsSupportProvider>
  );
}
