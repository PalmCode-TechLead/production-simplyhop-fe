import { PageLoader } from "@/core/components/page_loader";
import { FooterApp } from "@/core/modules/app/fragments/footer";
import { TopNavigation } from "@/core/modules/app/fragments/top_navigation";
import { fetchGetUserProfileData } from "@/core/services/rest/simplyhop/user_profile";
import { AppCollectionURL } from "@/core/utils/router/constants";
import clsx from "clsx";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { UserProfile, UserProvider } from "@/core/modules/app/context";
import { GetUserProfileDataSuccessResponseInterface } from "@/core/models/rest/simplyhop/user_profile";

export const metadata: Metadata = {
  title: "Trip",
};

type TripLayoutProps = {
  children: React.ReactNode;
};

export default async function TripLayout({ children }: TripLayoutProps) {
  const cookieStore = await cookies(); // ✅ with await
  const token = cookieStore.get("token")?.value;
  let userProfile: UserProfile | null = null;
  try {
    const user = (await fetchGetUserProfileData({
      headers: {
        token: token ?? "",
      },
    })) as GetUserProfileDataSuccessResponseInterface;

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
      gender: user.data.gender ?? null,
      // is_able_to_ride: user.data.can_share_ride === 1,
      is_able_to_ride:true
    };
  } catch {
    redirect(AppCollectionURL.public.login());
  }
  return (
    <Suspense fallback={<PageLoader />}>
      <main className={clsx("w-full min-h-screen")}>
        <TopNavigation />
        <div className={clsx("pt-[90px]", "w-full min-h-screen")}>
          <UserProvider profile={!userProfile ? undefined : userProfile}>
            {children}
          </UserProvider>
        </div>
        <FooterApp />
      </main>
    </Suspense>
  );
}
