"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <span className="text-2xl text-gray-700">
        <span>Error occurred: {error.message}</span>
      </span>
    </div>
  );
}
