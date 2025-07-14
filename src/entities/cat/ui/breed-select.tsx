import { Select } from "@/shared/ui";
import { trpc } from "@/shared/api/trpc";

export type BreedSelectProps = {
  selected: string | null;
  onChange: (value: string) => void;
};

export const BreedSelect = ({ selected, onChange }: BreedSelectProps) => {
  const { data, isLoading } = trpc.breeds.list.useQuery();

  return (
    <Select
      value={selected}
      placeholder="Select breed"
      items={data?.map((b) => ({ value: b.id, label: b.name })) ?? []}
      onSelect={onChange}
      isLoading={isLoading}
    />
  );
};
