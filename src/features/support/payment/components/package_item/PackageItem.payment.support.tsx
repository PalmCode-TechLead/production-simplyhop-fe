import * as React from "react";
import clsx from "clsx";

export interface PackageItemPaymentSupportProps {
  name?: string;
  description?: string;
  price?: string;
  badge?: {
    isShowed: boolean;
    label: string;
  };
}

export default function PackageItemPaymentSupport({
  name = "",
  description,
  price = "",
  badge = {
    isShowed: false,
    label: "",
  },
}: PackageItemPaymentSupportProps) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0rem]",
        "w-full",
        "border border-[#EFEFEF]",
        "rounded-[0.625rem]",
        "overflow-clip"
      )}
    >
      <div
        className={clsx("w-full h-[0.5rem]")}
        style={{
          background: "linear-gradient(90deg, #33CC33 0%, #1A661A 100%)",
        }}
      />
      <div
        className={clsx(
          "grid grid-flow-col justify-items-start justify-between items-center content-center",
          "w-full",
          "py-[1.5rem] px-[1.5rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
            "w-full"
          )}
        >
          {/* active status */}
          {badge.isShowed && (
            <div
              className={clsx(
                "bg-[#F0FFEC]",
                "border border-[#2F8C16]",
                "rounded-[0.375rem]",
                "text-[0.75rem] text-[#2F8C16] font-medium",
                "px-[0.25rem] py-[0.25rem]"
              )}
            >
              {badge.label}
            </div>
          )}
          {/* text */}
          <p className={clsx("text-[1.5rem] text-[#000000] font-bold")}>
            {name}
          </p>
          <p className={clsx("text-[0.75rem] text-[#727272] font-medium")}>
            {description}
          </p>
        </div>

        <p
          className={clsx("text-[2rem] text-[#000000] font-bold")}
          dangerouslySetInnerHTML={{ __html: price }}
        />
      </div>
    </div>
  );
}
