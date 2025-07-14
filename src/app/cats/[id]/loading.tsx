import { Loader } from "@/shared/ui";

export default function Loading() {
  return (
    <div className="w-[400px] h-[400px] flex items-center justify-center">
      <Loader className="w-16 h-16" />
    </div>
  );
}
