// import { SettingsSidebarApp } from "@/core/modules/app/fragments/settings_sidebar";
import { Suspense } from "react";
import { TopNavigation } from "@/core/modules/app/fragments/top_navigation";
import clsx from "clsx";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { FooterApp } from "@/core/modules/app/fragments/footer";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { fetchGetUserProfileData } from "@/core/services/rest/simplyhop/user_profile";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const metadata: Metadata = {
  title: "Settings",
};

type PaymentLayoutProps = {
  children: React.ReactNode;
};

const SettingsSidebarApp = dynamic(() =>
  import("@/core/modules/app/fragments/settings_sidebar").then(
    (mod) => mod.SettingsSidebarApp
  )
);

export default async function AccountLayout({ children }: PaymentLayoutProps) {
  const cookieStore = await cookies(); // ✅ with await
  const token = cookieStore.get("token")?.value;

  try {
    await fetchGetUserProfileData({
      headers: {
        token: token ?? "",
      },
    });
  } catch {
    redirect(AppCollectionURL.public.login());
  }
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
            <Suspense fallback={<div />}>
              <SettingsSidebarApp />
            </Suspense>

            {children}
          </div>
        </div>
      </div>
      <FooterApp />
    </main>
  );
}
