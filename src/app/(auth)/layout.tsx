import clsx from "clsx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simply Hop",
};

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center",
        "w-full h-full min-h-[100vh]",
        "relative"
      )}
      style={{
        backgroundImage: `url('/images/auth/auth-bg.png')`,
        backgroundPosition: "cover",
      }}
    >
      {children}
    </main>
  );
}
