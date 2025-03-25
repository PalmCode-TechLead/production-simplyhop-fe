import clsx from "clsx";
import type { Metadata } from "next";
import Image from "next/image";

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
        "grid grid-rows-1 grid-cols-2 place-content-center place-items-center",
        "w-full h-full min-h-[100vh]",
        "relative"
      )}
    >
      <div className={clsx("relative", "w-full h-full")}>
        <Image
          src={"/images/auth/auth-bg-3.svg"}
          alt="login"
          width={1046}
          height={597}
          className={clsx(
            "w-full h-full max-h-[100vh]",
            "object-center object-cover"
          )}
          style={{
            background:
              "linear-gradient(180deg, rgba(7, 37, 0, 0.03) 34.57%, #202D1C 137.32%)",
          }}
        />
        <div
          className={clsx(
            "absolute left-[60px] bottom-[0px]",
            "grid grid-cols-1 place-content-start place-items-start gap-[0rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[0rem]"
            )}
          >
            <h1 className={clsx("text-[#FFFFFF] text-[104.6px] font-bold")}>
              {"SimplyHop"}
            </h1>
            <p className={clsx("text-[#FFFFFF] text-[2rem] font-semibold")}>
              {"Drive Together"}
            </p>
          </div>
        </div>
      </div>

      {children}
    </main>
  );
}
