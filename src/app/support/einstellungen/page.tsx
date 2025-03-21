import { SettingsSupportContainer } from "@/features/support/settings/container";
import { SettingsSupportProvider } from "@/features/support/settings/context";

export default function SettingsPage() {
  return (
    <SettingsSupportProvider>
      <SettingsSupportContainer />
    </SettingsSupportProvider>
  );
}
