import { PageLoader } from "@/core/components/page_loader";
import { FooterApp } from "@/core/modules/app/fragments/footer";
import { TopNavigation } from "@/core/modules/app/fragments/top_navigation";
import { fetchGetUserProfileData } from "@/core/services/rest/simplyhop/user_profile";
import { AppCollectionURL } from "@/core/utils/router/constants";
import clsx from "clsx";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Trip",
};

type TripLayoutProps = {
  children: React.ReactNode;
};

export default async function TripLayout({ children }: TripLayoutProps) {
  try {
    await fetchGetUserProfileData();
  } catch (err) {
    redirect(AppCollectionURL.public.login());
  }
  return (
    <Suspense fallback={<PageLoader />}>
      <main className={clsx("w-full min-h-screen")}>
        <TopNavigation />
        <div className={clsx("pt-[90px]", "w-full min-h-screen")}>
          {children}
        </div>
        <FooterApp />
      </main>
    </Suspense>
  );
}
