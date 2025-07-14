import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import cx from "classnames";
import { Label } from "radix-ui";

export type InputProps = {
  label?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

// TODO: fix config for eslintx
export const Input = forwardRef(
  (
    { label, className, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return label ? (
      <div className={cx("flex flex-col gap-1", className)}>
        <Label.Root>
          <span className="text-sm text-gray-600 mb-1">{label}</span>

          <_Input ref={ref} {...props} />
        </Label.Root>
      </div>
    ) : (
      <_Input ref={ref} className={className} {...props} />
    );
  },
);

Input.displayName = "Input";

const _Input = forwardRef(
  (
    { className, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => (
    <input
      ref={ref}
      className={cx(
        "w-full px-4 py-2 bg-white border border-gray-400 rounded-lg text-sm focus:border-indigo-400",
        className,
      )}
      {...props}
    />
  ),
);

_Input.displayName = "Input";
