import * as React from "react";
import clsx from "clsx";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useRouter, useSearchParams } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const RideDetailMyListTrip = () => {
  const searchParams = useSearchParams();
  const rideId = searchParams.get("ride_id");
  const { isLg } = useTailwindBreakpoint();
  const router = useRouter();

  const isOpen = !!rideId;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString()); // Ambil semua params
    params.delete("booking_id");
    router.push(AppCollectionURL.private.myList(params.toString()), {
      scroll: false,
    });
  };

  return (
    <AdaptiveModal
      variant={isLg ? "modal" : "bottom_sheet"}
      className={clsx(
        "!max-w-[524px]",
        "h-fit",
        "!rounded-[0.625rem]",
        "overflow-auto",
        "!px-[0rem] !py-[0rem]"
      )}
      open={isOpen}
      onClose={handleClose}
    >
      <div></div>
    </AdaptiveModal>
  );
};
