import { Badge, Button } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { TakeCatButton } from "@/features/take-cat";
import { createServerSideTRPC } from "@/shared/api/trpc-server";
import { guardProtected } from "@/entities/session/lib";

export default async function CatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const helpers = await createServerSideTRPC();

  await guardProtected(helpers);

  const data = await helpers.cats.cat.fetch({
    id: (await params).id,
  });

  const breedName = data.breeds?.[0].name ?? "Unknown breed";

  return (
    <>
      {!data ? (
        <div>Not found</div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-6 sm:min-w-[400px]">
            <Image
              src={data.url}
              alt="cat"
              width={240}
              height={240}
              className="w-50 h-50 object-cover rounded-md m-auto"
            />

            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row gap-2 mb-3">
                <Badge color="indigo">Cat</Badge>
                <Badge color="indigo">{breedName}</Badge>
                <Badge color="indigo">Smart</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="font-semibold">Name:</div>
                <div className="text-nowrap">Cat-{data.id}</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="font-semibold">Age:</div>
                <div className="text-nowrap">{data.age} years</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="font-semibold">Breed:</div>
                <div className="text-nowrap">{breedName}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 max-w-[400px] text-gray-700">
            The smart cat is looking for a good owner who can provide a safe,
            loving, and stimulating environment.
          </div>

          <div className="flex gap-4 mt-6">
            <Link href="/cats" className="w-full">
              <Button mode="secondary">Back to Cats</Button>
            </Link>

            <TakeCatButton id={data.id} />
          </div>
        </>
      )}
    </>
  );
}
