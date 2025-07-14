import React from "react";
import { Select as RadixSelect } from "radix-ui";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import cx from "classnames";
import { Loader } from "./loader";

export type SelectProps = {
  items: { value: string; label: string }[];
  value: string | null;
  onSelect?: (value: string) => void;
  placeholder?: string;
  name?: string;
  isLoading?: boolean;
};
export const Select = ({
  items,
  value,
  onSelect,
  placeholder,
  isLoading,
}: SelectProps) => (
  <RadixSelect.Root value={value ?? undefined} onValueChange={onSelect}>
    <RadixSelect.Trigger
      className={cx(
        "bg-white flex justify-between items-center w-full px-4 py-2 border border-gray-400 rounded-lg text-sm focus:border-indigo-400 cursor-pointer",
      )}
    >
      <RadixSelect.Value
        placeholder={<span className="text-gray-500">{placeholder}</span>}
      />

      <RadixSelect.Icon>
        {isLoading ? <Loader /> : <ChevronDownIcon />}
      </RadixSelect.Icon>
    </RadixSelect.Trigger>

    <RadixSelect.Portal>
      <RadixSelect.Content className="z-10 bg-white rounded-lg shadow-md">
        <RadixSelect.ScrollUpButton className="px-4 py-2 flex items-center justify-center cursor-pointer">
          <ChevronUpIcon />
        </RadixSelect.ScrollUpButton>

        <RadixSelect.Viewport>
          {items.map(({ value, label }) => (
            <RadixSelect.Item
              className="relative px-4 py-2 rounded-lg text-indigo-700 hover:bg-indigo-700 hover:text-indigo-50 text-sm cursor-pointer"
              key={value}
              value={value}
            >
              <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
              <RadixSelect.ItemIndicator />
            </RadixSelect.Item>
          ))}
        </RadixSelect.Viewport>

        <RadixSelect.ScrollDownButton className="px-4 py-2 flex items-center justify-center cursor-pointer">
          <ChevronDownIcon />
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  </RadixSelect.Root>
);
