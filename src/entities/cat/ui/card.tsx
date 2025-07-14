import { Cat } from "@/entities/cat";
import Image from "next/image";
import { Badge } from "@/shared/ui";

export type CatCardProps = {
  cat: Cat;
};

export const CatCard = ({ cat }: CatCardProps) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-indigo-200 w-fit p-4 hover:shadow-lg cursor-pointer transition-all duration-200 ease-in-out">
    <Image
      src={cat.url}
      alt="Cat"
      width={240}
      height={240}
      className="w-40 h-40 object-cover mx-auto mb-4"
    />

    <div className="flex justify-between items-center">
      <h2 className="font-semibold text-lg">{cat.name}</h2>

      <Badge color="blue">{cat.age} years</Badge>
    </div>

    <p className="text-sm text-gray-600">{cat.id}</p>

    <p className="text-xs text-gray-400 mt-1 max-w-[224px]">
      {cat.description}
    </p>
  </div>
);
