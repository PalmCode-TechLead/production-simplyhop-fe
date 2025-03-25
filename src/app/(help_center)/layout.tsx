import { ContactApp } from "@/core/modules/app/fragments/contact";
import { TopNavigation } from "@/core/modules/app/fragments/top_navigation";
import clsx from "clsx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center",
};

type HelpCenterLayoutProps = {
  children: React.ReactNode;
};

export default function HelpCenterLayout({ children }: HelpCenterLayoutProps) {
  return (
    <main className={clsx("w-full min-h-screen")}>
      <TopNavigation />
      <div className={clsx("pt-[90px]", "w-full min-h-screen")}>
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full",
            "pt-[50px]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 md:grid-cols-[1fr_402px] place-content-start place-items-start gap-[5rem]",
              "w-full max-w-[1176px]"
            )}
          >
            {children}
            <ContactApp />
          </div>
        </div>
      </div>
    </main>
  );
}
