"use client"
import LogoutButton from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
// import { requireAuth } from "@/lib/auth-utils";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Home = () => {
  // await requireAuth();

  // const data = await caller.getUsers()

  const trpc = useTRPC();
  const queryClient = useQueryClient()
  const {data} = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      // queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
      toast.success("Job Queued")
    },

  }))

  const testAI = useMutation(trpc.testAi.mutationOptions({
    onSuccess: () => {
      // queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
      toast.success("Job Queued")
    },
    onError: () => {
      toast.error("Something went wrong")
    }
  }))

  return (
    <div className="items-center justify-center min-w-screen min-h-screen flex flex-col gap-4">
      <p className="text-black">
        {JSON.stringify(data)}
      </p>
      <Button onClick={() => create.mutate()} disabled={create.isPending}>
        Create Workflow 
      </Button>
      <Button onClick={() => testAI.mutate()} disabled={testAI.isPending}>
        Test AI
      </Button>
      <LogoutButton/>
    </div>
  );
}

export default Home;