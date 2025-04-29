import * as React from "react";
import clsx from "clsx";
import SVGIcon from "../../icons";

export interface AlertProps {
  variant?: "error" | "success" | "info" | "warning";
  message?: React.ReactNode;
  cta?: {
    children: React.ReactNode;
    onClick: () => void;
  };
  autoClose?: boolean;
  timeToClose?: number; //in ms
}

export const Alert = ({
  variant = "info",
  message,
  cta,
  autoClose = true,
  timeToClose = 7000,
}: AlertProps) => {
  React.useEffect(() => {
    if (!autoClose) return;
    const timeout = setTimeout(() => {
      cta?.onClick();
    }, timeToClose);

    return () => clearTimeout(timeout);
  }, [autoClose]);
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[0.5rem]",
        "w-full",
        "px-[1.25rem] py-[0.75rem]",
        variant === "error"
          ? "border border-[#FF0066]"
          : variant === "success"
          ? "border border-[#67A981]"
          : variant === "warning"
          ? "border border-[#DA9D03]"
          : "border border-[#6A6872]",
        variant === "error"
          ? "bg-[#FFE5F0]"
          : variant === "success"
          ? "bg-[#E6EDE9]"
          : variant === "warning"
          ? "bg-[#E9E9EA]"
          : "bg-[#F5EEDD]",
        "rounded-[0.5rem]"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <SVGIcon
          name={
            variant === "error"
              ? "AlertCircle"
              : variant === "success"
              ? "CheckCircle2"
              : variant === "warning"
              ? "AlertTriangle"
              : "AlertCircle"
          }
          className={clsx(
            "w-[1rem] h-[1rem]",
            variant === "error"
              ? "text-[#FF0066]"
              : variant === "success"
              ? "text-[#67A981]"
              : variant === "warning"
              ? "text-[#DA9D03]"
              : "text-[#6A6872]"
          )}
        />
        <span
          className={clsx(
            "text-[0.75rem] font-normal",
            variant === "error"
              ? "text-[#FF0066]"
              : variant === "success"
              ? "text-[#67A981]"
              : variant === "warning"
              ? "text-[#DA9D03]"
              : "text-[#6A6872]"
          )}
        >
          {message}
        </span>
      </div>
      {cta && (
        <button onClick={cta.onClick}>
          {cta.children}
          <SVGIcon
            name={"X"}
            className={clsx(
              "w-[1rem] h-[1rem]",
              variant === "error"
                ? "text-[#FF0066]"
                : variant === "success"
                ? "text-[#67A981]"
                : variant === "warning"
                ? "text-[#DA9D03]"
                : "text-[#6A6872]"
            )}
          />
        </button>
      )}
    </div>
  );
};
