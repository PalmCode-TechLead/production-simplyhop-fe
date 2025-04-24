import * as React from "react";
import { Modal, ModalProps } from "../modal";
import { BottomSheet } from "../bottom_sheet";
import { PageSheet } from "../page_sheet";

export interface AdaptiveModalProps extends ModalProps {
  variant?: "modal" | "bottom_sheet" | "page_sheet";
}

export const AdaptiveModal = ({
  variant = "modal",
  children,
  ...otherProps
}: AdaptiveModalProps) => {
  if (variant === "bottom_sheet") {
    return <BottomSheet {...otherProps}>{children}</BottomSheet>;
  }

  if (variant === "page_sheet") {
    return <PageSheet {...otherProps}>{children}</PageSheet>;
  }

  return <Modal {...otherProps}>{children}</Modal>;
};
