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
          "bg-[#F0EFEF]",
          "rounded-[1.25rem]",
          "text-[#636262] text-[0.875rem] font-medium",
          "cursor-pointer"
        )}
        onClick={handleClickDropdownButton}
      >
        <SVGIcon
          name={"ArrowDownWideNarrow"}
          className={clsx("w-[1.25rem] h-[1.25rem]", "text-[#636262]")}
        />
        {!selected ? label : selected.name}
        <SVGIcon
          name={isOpen ? "ChevronUp" : "ChevronDown"}
          className={clsx("w-[1.25rem] h-[1.25rem]", "text-[#636262]")}
        />
      </button>

      {isOpen && (
        <div
          className={clsx(
            "absolute top-[40px] left-0 right-0",
            "bg-[#F0EFEF]",
            "rounded-[1.25rem]",
            "max-h-[200px]",
            "overflow-auto"
          )}
        >
          {items.map((item, itemIndex) => (
            <button
              key={itemIndex}
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center",
                "w-full",
                "text-[#636262] text-[0.875rem] font-medium"
              )}
              onClick={() => onSelect(item)}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
