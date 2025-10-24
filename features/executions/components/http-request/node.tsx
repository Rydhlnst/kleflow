import { BaseExecutionNode } from "@/components/base-execution-node";
import { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo } from "react";

type HTTPRequestNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATHC" | "DELETE";
    body?: string;
    [key: string]: unknown;
}

type HTTPRequestNodeType = Node<HTTPRequestNodeData>;

export const HTTPRequestNode = memo((props: NodeProps<HTTPRequestNodeType>) => {
    const nodeData = props.data as HTTPRequestNodeData
    const description = nodeData?.endpoint ? `${nodeData.method || "GET"}: ${nodeData.endpoint}` : "Not configured"

    return (
        <>
            <BaseExecutionNode
                {...props}
                id={props.id}
                icon={GlobeIcon}
                name="HTTP Request"
                description={description}
                onSetting={() => {}}
                onDoubleClick={() => {}}
            />
        </>
    )

})

HTTPRequestNode.displayName = "HTTPRequestNode"