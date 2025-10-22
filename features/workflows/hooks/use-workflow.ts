import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";

// Hook to fetch all workflows using suspense
export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    const [params] = useWorkflowsParams()

    return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
}

// Hooks to create a new workflows
export const useCreateWorkflows = () => {
    // const router = useRouter()
    const queryClient = useQueryClient();
    const trpc = useTRPC()

    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow "${data.name}" created`);
            // router.push(`/workflows/${data.id}`);
            queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
        },
        onError: (err) => {
            toast.error(`Failed to create workflows: ${err.message}`)
        }
    }))
}

export const useRemoveWorkflows = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.workflows.remove.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow "${data.name}" removed`);
                queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
                queryClient.invalidateQueries(
                    trpc.workflows.getOne.queryFilter({id: data.id})
                )
            }
        })
    )
}

// Hook to fetch all workflows using suspense
export const useSuspenseWorkflow = (id: string) => {
    const trpc = useTRPC();

    return useSuspenseQuery(trpc.workflows.getOne.queryOptions({id}));
}

// Hooks to update a workflow name
export const useUpdateWorkflowName = () => {
    // const router = useRouter()
    const queryClient = useQueryClient();
    const trpc = useTRPC()

    return useMutation(trpc.workflows.updateName.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow "${data.name}" updated`);
            // router.push(`/workflows/${data.id}`);
            queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
            queryClient.invalidateQueries(trpc.workflows.getOne.queryOptions({id: data.id}))
        },
        onError: (err) => {
            toast.error(`Failed to update workflows: ${err.message}`)
        }
    }))
}