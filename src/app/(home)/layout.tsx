import { FooterApp } from "@/core/modules/app/fragments/footer";
import { TopNavigation } from "@/core/modules/app/fragments/top_navigation";
import clsx from "clsx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trip",
};

type TripLayoutProps = {
  children: React.ReactNode;
};

export default async function TripLayout({ children }: TripLayoutProps) {
  return (
    <main className={clsx("w-full min-h-screen")}>
      <TopNavigation />
      <div className={clsx("pt-[90px]", "w-full min-h-screen")}>{children}</div>
      <FooterApp />
    </main>
  );
}
