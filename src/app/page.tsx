import { LoginForm } from "@/features/login";
import { createServerSideTRPC } from "@/shared/api/trpc-server";
import { guardPublic } from "@/entities/session/lib";

export const dynamic = "force-dynamic";

export default async function Login() {
  const helpers = await createServerSideTRPC();

  await guardPublic(helpers);

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-lg space-y-6">
        <div className="flex flex-col items-center">
          <div className="text-5xl">🐱</div>

          <h1 className="mt-2 text-xl font-semibold text-gray-800">
            Meow Login
          </h1>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
