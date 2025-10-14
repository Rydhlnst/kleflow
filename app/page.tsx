import {caller, getQueryClient, trpc} from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Client from "./client";
import { Suspense } from "react";

const Home = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());



  return (
    <div className="flex items-center justify-center min-w-screen min-h-screen">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <Client/>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}

export default Home;