import { SettingsSidebarApp } from "@/core/modules/app/fragments/settings_sidebar";
import { TopNavigation } from "@/core/modules/app/fragments/top_navigation";
import clsx from "clsx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

type PaymentLayoutProps = {
  children: React.ReactNode;
};

export default function AccountLayout({ children }: PaymentLayoutProps) {
  return (
    <main className={clsx("w-full min-h-screen")}>
      <TopNavigation />

      <div className={clsx("pt-[90px]", "w-full min-h-screen")}>
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full",
            "px-[1rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 lg:grid-cols-[334px_1fr] place-content-start place-items-start gap-[1.5rem] lg:gap-[54px]",
              "w-full max-w-container",
              "pt-[2rem]"
            )}
          >
            <SettingsSidebarApp />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
