"use client";

import {BreedSelect, Cat, CatCard} from "@/entities/cat";
import Link from "next/link";
import {Loader} from "@/shared/ui";
import {CatsFilters, useCatsFilterByBreed} from "./model";

export const Catalog = () => {
  const { data, isLoading, filters, handleFiltersChange, error } =
    useCatsFilterByBreed();

  return (
    <>
      <div className="sticky top-0 z-10 bg-white px-6 py-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:max-w-4xl mx-auto">
          <h1 className="flex-1 text-3xl">Cats 😸</h1>

          <Filters filters={filters} onChange={handleFiltersChange} />
        </div>
      </div>

      <div className="w-full md:max-w-4xl mx-auto py-6">
        <CatList data={data} isLoading={isLoading} error={error} />
      </div>
    </>
  );
};

type FiltersProps = {
  filters: CatsFilters;
  onChange: (filters: CatsFilters) => void;
};

const Filters = ({ filters, onChange }: FiltersProps) => {
  const handleSelectBreed = (breed: string) => {
    onChange({ ...filters, breed });
  };

  return (
    <div className="flex-1 w-full sm:w-[300px]">
      <BreedSelect selected={filters.breed} onChange={handleSelectBreed} />
    </div>
  );
};

type CatListProps = {
  data: Cat[] | undefined;
  isLoading: boolean;
  error: string | undefined;
};

const CatList = ({ data, isLoading, error }: CatListProps) => {
  if (isLoading) {
    return <Loader className="w-15 h-15 mx-auto mt-[30%]" />;
  }

  if (error) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-700">
          Error occurred: {error}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-700">No cats found</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-self-center gap-4">
      {data?.map((cat) => (
        <Link href={`/cats/${cat.id}`} key={cat.id}>
          <CatCard key={cat.id} cat={cat} />
        </Link>
      ))}
    </div>
  );
};
