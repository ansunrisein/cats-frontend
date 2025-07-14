"use client";

import { HTMLAttributes } from "react";
import cx from "classnames";

export type BadgeProps = {
  color: "indigo" | "gray" | "blue";
} & HTMLAttributes<HTMLDivElement>;

export const Badge = ({ color, className, children, ...props }: BadgeProps) => {
  return (
    <span
      className={cx(
        "inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-semibold leading-4 whitespace-nowrap",
        color === "indigo" && "bg-indigo-100 text-indigo-800",
        color === "gray" && "bg-gray-100 text-gray-800",
        color === "blue" && "bg-blue-100 text-blue-800",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
