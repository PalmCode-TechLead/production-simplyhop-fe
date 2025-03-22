import * as React from "react";
import clsx from "clsx";

export type TextareaLabelProps = React.HTMLProps<HTMLLabelElement>;

export const TextareaLabel = ({
  id,
  className,
  children,
  required,
  ...otherProps
}: TextareaLabelProps) => {
  return (
    <label
      {...otherProps}
      htmlFor={id}
      className={clsx(
        "absolute",
        "text-[#606060]",
        "transition-all transform scale-100",
        className
      )}
    >
      {children}
      {required && <span className={clsx("text-[#FF0066]")}>{"*"}</span>}
    </label>
  );
};
