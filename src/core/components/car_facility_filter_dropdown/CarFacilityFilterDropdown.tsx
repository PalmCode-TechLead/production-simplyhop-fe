import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";
import { useOnClickOutside } from "usehooks-ts";
import { VehicleFilterCheckbox } from "../vehicle_filter_checkbox";

export interface CarFacilityFilterDropdownProps {
  selected?: { id: string; name: string }[];
  label?: string;
  items?: { id: string; name: string }[];
  onSelect?: (data: { id: string; name: string }) => void;
}

export const CarFacilityFilterDropdown = ({
  selected = [],
  label = "",
  items = [],
  onSelect = () => {},
}: CarFacilityFilterDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref as any, () => {
    setIsOpen(false);
  });
  const handleClickDropdownButton = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div ref={ref} className={clsx("relative", "rounded-[1.25rem]")}>
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
            "absolute top-[40px] left-0 right-0",
            "bg-[white]",
            "rounded-[0.75rem]",
            "max-h-[200px] w-[255px]",
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
                <VehicleFilterCheckbox
                  key={itemIndex}
                  label={item.name}
                  checked={selected
                    .map((selectedItem) => selectedItem.id)
                    .includes(item.id)}
                  onChange={() => onSelect(item)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
