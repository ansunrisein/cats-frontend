"use client";

import { Button } from "@/shared/ui";
import { takeCat } from "./model";

export type TakeCatButtonProps = {
  id: string;
};

export const TakeCatButton = ({ id }: TakeCatButtonProps) => {
  const handleClick = () => {
    takeCat({ id });
  };

  return <Button onClick={handleClick}>I want this cat</Button>;
};
