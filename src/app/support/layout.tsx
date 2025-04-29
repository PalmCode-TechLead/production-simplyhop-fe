import { Suspense } from "react";
import { TopNavigation } from "@/core/modules/app/fragments/top_navigation";
import clsx from "clsx";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
// import { FooterApp } from "@/core/modules/app/fragments/footer";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { fetchGetUserProfileData } from "@/core/services/rest/simplyhop/user_profile";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { UserProfile, UserProvider } from "@/core/modules/app/context";
import { GetUserProfileDataSuccessResponseInterface } from "@/core/models/rest/simplyhop/user_profile";

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
  let userProfile: UserProfile | null = null;
  try {
    const res = await fetchGetUserProfileData({
      headers: {
        token: token ?? "",
      },
    });
    const user = res as GetUserProfileDataSuccessResponseInterface;
    userProfile = {
      id: user.data.id,
      first_name: user.data?.first_name ?? "",
      last_name: user.data?.last_name ?? "",
      avatar: user.data.avatar,
      email: user.data.email,
      phonenumber: user.data?.mobile ?? "",
      city: user.data?.city ?? "",
      about_me: user.data?.profile?.bio ?? "",
      is_driver: user.data?.is_driver === 1 ? true : false,
      gender: user.data?.gender ?? null,
      is_able_to_ride: user.data.can_share_ride === 1,
    };
  } catch {
    redirect(AppCollectionURL.public.login());
  }
  return (
    <UserProvider profile={!userProfile ? undefined : userProfile}>
      <main className={clsx("w-full min-h-screen")}>
        <TopNavigation />

        <div className={clsx("w-full min-h-screen")}>
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
                "w-full max-w-container min-h-screen"
              )}
            >
              <Suspense fallback={<div />}>
                <div
                  className={clsx(
                    "w-full",
                    "sticky top-[calc(90px)] z-[30]",
                    "bg-[white]"
                  )}
                >
                  <div className={clsx("w-full", "pt-[2rem]")}>
                    <SettingsSidebarApp />
                  </div>
                </div>

                <div className={clsx("w-full", "pt-[calc(90px+2rem)]")}>
                  {children}
                </div>
              </Suspense>
            </div>
          </div>
        </div>
        {/* <FooterApp /> */}
      </main>
    </UserProvider>
  );
}
