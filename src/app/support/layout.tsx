import { AppContainer } from "@/core/modules/app/container";
import { SettingsSidebarApp } from "@/core/modules/app/fragments/settings_sidebar";
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
    <AppContainer>
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-[334px_1fr] place-content-start place-items-start gap-[54px]",
            "w-full max-w-container",
            "pt-[2rem]"
          )}
        >
          <SettingsSidebarApp />
          {children}
        </div>
      </div>
    </AppContainer>
  );
}
