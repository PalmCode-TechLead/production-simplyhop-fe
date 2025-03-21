import { HelpCenterSupportContainer } from "@/features/support/help_center/container";
import { HelpCenterSupportProvider } from "@/features/support/help_center/context";

export default function HelpCenterPage() {
  return (
    <HelpCenterSupportProvider>
      <HelpCenterSupportContainer />
    </HelpCenterSupportProvider>
  );
}
