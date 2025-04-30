import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { fetchGetUserProfileData } from "@/core/services/rest/simplyhop/user_profile";
import { GetUserProfileDataSuccessResponseInterface } from "@/core/models/rest/simplyhop/user_profile";
import { UserProfile, UserProvider } from "@/core/modules/app/context";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const metadata: Metadata = {
  title: "Profile Registration",
};

type ProfileLayoutProps = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({
  children,
}: ProfileLayoutProps) {
  const cookieStore = await cookies(); // ✅ with await
  const token = cookieStore.get("token")?.value;
  let userProfile: UserProfile | null = null;

  try {
    const res = await fetchGetUserProfileData({
      headers: {
        token: token ?? "",
      },
    });
    console.log(res, "ini user from server");
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
      is_able_to_ride: user.data.can_share_ride,
    };
  } catch {
    redirect(AppCollectionURL.public.login());
  }
  return (
    <UserProvider profile={!userProfile ? undefined : userProfile}>
      {children}
    </UserProvider>
  );
}
