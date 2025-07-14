import { ButtonHTMLAttributes } from "react";
import cx from "classnames";

export type ButtonProps = {
  mode?: "primary" | "secondary";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  mode = "primary",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cx(
        "w-full py-2 rounded-lg transition cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
        mode === "primary" && "text-white bg-indigo-600 hover:bg-indigo-700",
        mode === "secondary" &&
          "bg-white border-1 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
