import * as React from "react";
import clsx from "clsx";
import { VehicleFilterCheckbox } from "../vehicle_filter_checkbox";

export interface VehicleFilterListProps {
  selected?: { id: string; name: string }[];
  label?: string;
  items?: { id: string; name: string }[];
  onSelect?: (data: { id: string; name: string }) => void;
}

export const VehicleFilterList = ({
  selected = [],
  label = "",
  items = [],
  onSelect = () => {},
}: VehicleFilterListProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
        "w-full"
      )}
    >
      <p className={clsx("text-[#232323] text-[1rem] font-semibold")}>
        {label}
      </p>

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
  );
};
