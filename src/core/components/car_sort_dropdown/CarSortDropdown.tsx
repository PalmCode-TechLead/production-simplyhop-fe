import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";
import { useOnClickOutside } from "usehooks-ts";

export interface CarSortDropdownProps {
  selected?: { id: string; name: string } | null;
  label?: string;
  items?: { id: string; name: string }[];
  onSelect?: (data: { id: string; name: string }) => void;
}

export const CarSortDropdown = ({
  selected = null,
  label = "",
  items = [],
  onSelect = () => {},
}: CarSortDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref as any, () => {
    setIsOpen(false);
  });
  const handleClickDropdownButton = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div ref={ref} className={clsx("relative")}>
      <button
        className={clsx(
          "grid grid-flow-col place-content-center place-items-center gap-[0.5rem]",
          "px-[0.5rem] py-[0.25rem]",
          "bg-[white]",
          "border",
          isOpen ? "border-[#5AC53D]" : "border-[#E9E6E6]",
          "rounded-[1.25rem]",
          "text-[0.875rem] font-medium",
          isOpen ? "text-[#5AC53D]" : "text-[#636262]",
          "cursor-pointer"
        )}
        onClick={handleClickDropdownButton}
      >
        <SVGIcon
          name={"ArrowDownWideNarrow"}
          className={clsx(
            "w-[1.25rem] h-[1.25rem]",
            isOpen ? "text-[#5AC53D]" : "text-[#636262]"
          )}
        />
        {label}
        <SVGIcon
          name={isOpen ? "ChevronUp" : "ChevronDown"}
          className={clsx(
            "w-[1.25rem] h-[1.25rem]",
            isOpen ? "text-[#5AC53D]" : "text-[#636262]"
          )}
        />
      </button>

      {isOpen && (
        <div
          className={clsx(
            "absolute top-[40px] right-0",
            "bg-[white]",
            "border border-[#E9E6E6]",
            "rounded-[0.5rem] w-[255px]",
            "max-h-[200px]",
            "overflow-auto",
            "px-[1rem] py-[1rem]"
          )}
          style={{
            backdropFilter: "blur(20px)",
            boxShadow: "0px 0px 25px 0px #969C9640",
          }}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
              "w-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
                "w-full"
              )}
            >
              {items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className={clsx(
                    "grid grid-flow-col items-center content-center justify-between justify-items-start",
                    "w-full",
                    "text-[0.875rem]",
                    selected?.id === item.id
                      ? "text-[#5AC53D] font-semibold"
                      : "text-[#232323] font-medium",
                    "cursor-pointer"
                  )}
                  onClick={() => onSelect(item)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
