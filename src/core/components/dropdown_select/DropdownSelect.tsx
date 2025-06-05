import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";
import { useOnClickOutside } from "usehooks-ts";
import { DropdownSelectButton } from "../dropdown_select_button";

export interface DropdownSelectProps {
  selected?: null | { id: string; name: string };
  items?: {
    id: string;
    name: string;
  }[];
  onSelect?: (data: { id: string; name: string }) => void;
}

export const DropdownSelect = ({
  selected = null,
  items = [],
  onSelect = () => {},
}: DropdownSelectProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref as any, () => {
    setIsOpen(false);
  });

  const handleClickDropdownSelectButton = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (data: { id: string; name: string }) => {
    onSelect(data);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={clsx("relative", "w-full")}>
      <DropdownSelectButton
        className={clsx(
          "!items-center !content-center",
          "!text-[#5B5B5B] !text-[0.875rem] !font-normal"
        )}
        onClick={handleClickDropdownSelectButton}
      >
        <span
          className={clsx(
            "!text-[#5B5B5B] !text-[0.875rem] !font-normal text-ellipsis truncate w-full"
          )}
        >
          {selected?.name}
        </span>

        <SVGIcon
          name={isOpen ? "ChevronUp" : "ChevronDown"}
          className={clsx("w-[1rem] h-[1rem]", "text-[#5B5B5B]")}
        />
      </DropdownSelectButton>
      {isOpen && (
        <div
          className={clsx(
            "absolute",
            "top-[60px] left-0 right-0",
            "grid grid-cols-1 place-content-start place-items-start",
            "px-[1rem] py-[0.75rem]",
            "min-w-[255px]",
            "bg-[white]",
            "rounded-[0.375rem]",
            "border border-[#E2E2E2]",
            "z-[10]"
          )}
        >
          {items.map((item, itemIndex) => (
            <button
              aria-label={item.name}
              name={item.name}
              key={itemIndex}
              className={clsx(
                "w-full",
                "!text-[#5B5B5B] !text-[0.875rem] !font-normal text-left",
                "py-[0.5rem]",
                "cursor-pointer disabled:cursor-default"
              )}
              onClick={() => handleSelect(item)}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
