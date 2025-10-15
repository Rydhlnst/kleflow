
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

const Home = async () => {
  await requireAuth();

  const data = await caller.getUsers()

  return (
    <div className="flex items-center justify-center min-w-screen min-h-screen">
      {JSON.stringify(data)}
    </div>
  );
}

export default Home;