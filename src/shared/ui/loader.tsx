import { HTMLAttributes } from "react";
import cx from "classnames";

export type LoaderProps = HTMLAttributes<HTMLDivElement>;

export const Loader = ({ className, ...props }: LoaderProps) => (
  <div
    className={cx(
      className,
      "animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500",
    )}
    {...props}
  />
);
