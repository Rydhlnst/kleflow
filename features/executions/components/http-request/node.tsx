import { BaseExecutionNode } from "@/components/base-execution-node";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import HTTPRequestDialog, { FormType } from "./dialog";

type HTTPRequestNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
    [key: string]: unknown;
}

type HTTPRequestNodeType = Node<HTTPRequestNodeData>;

export const HTTPRequestNode = memo((props: NodeProps<HTTPRequestNodeType>) => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const {setNodes} = useReactFlow()

    const nodeData = props.data;
    const description = nodeData?.endpoint ? `${nodeData.method || "GET"}: ${nodeData.endpoint}` : "Not configured"

    const handleOpenSettings = () => setDialogOpen(true)

    const nodeStatus = "initial"

    const handleSubmit = (values: FormType) => {
        setNodes((nodes) => nodes.map((node) => {
            if(node.id === props.id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        endpoint: values.endpoint,
                        method: values.method,
                        body: values.body
                    }
                }
            }
            return node;
        }))
    }

    return (
        <>
            <HTTPRequestDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={handleSubmit}
                defaultEndpoint={nodeData.endpoint} // TODO: Check apakah bisa diimprove dengan memberikan initial value
                defaultBody={nodeData.body}
                defaultMethod={nodeData.method}
            />
            <BaseExecutionNode
                {...props}
                id={props.id}
                icon={GlobeIcon}
                name="HTTP Request"
                description={description}
                onSetting={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
                status={nodeStatus}
            />
        </>
    )

})

HTTPRequestNode.displayName = "HTTPRequestNode"