"use client"

import { type NodeProps, Position, useReactFlow } from "@xyflow/react"
import type { LucideIcon } from "lucide-react"
import {memo, type ReactNode} from "react"
import { WorkflowNode } from "./workflow-node";
import { BaseNode, BaseNodeContent } from "./react-flow/base-node";
import Image from "next/image";
import { BaseHandle } from "./react-flow/base-handle";
import { NodeStatusIndicator, type NodeStatus } from "./react-flow/node-status-indicator";

interface BaseExecutionNodeProps extends NodeProps {
    icon: LucideIcon | string;
    name: string;
    description?: string;
    children?: ReactNode;
    status?: NodeStatus;
    onSetting?: () => void;
    onDoubleClick?: () => void;
}

export const BaseExecutionNode = memo(({id,status="initial", name, icon: Icon, description, children, onSetting, onDoubleClick}: BaseExecutionNodeProps) => {
   
    const {setNodes, setEdges} = useReactFlow();
   
       const handleDelete = () => {
           setNodes((currentNodes) => {
               const updatedNodes = currentNodes.filter((node) => node.id !== id);
               return updatedNodes;
           })
   
           setEdges((currentEdges) => {
               const updatedEdges = currentEdges.filter((edge) => edge.source !== id && edge.target !== id)
               return updatedEdges;
           })
       }
    return (
        <WorkflowNode
            name={name}
            description={description}
            onDelete={handleDelete}
            onSettings={onSetting}
        >
            <NodeStatusIndicator
                variant="border"
                status={status}
            >
                <BaseNode onDoubleClick={onDoubleClick} status={status}>
                    <BaseNodeContent>
                        {typeof Icon === "string" ? (
                            <Image src={Icon} alt={name} width={16} height={16}/>
                        ) : (
                            <Icon className="size-4 text-muted-foreground"/>
                        )} 
                        {children}
                        <BaseHandle
                            id="target-1"
                            type="target"
                            position={Position.Left}
                        />
                        <BaseHandle
                            id="source-1"
                            type="source"
                            position={Position.Right}
                        />
                    </BaseNodeContent>
                </BaseNode>
            </NodeStatusIndicator>
        </WorkflowNode>
    )
})

BaseExecutionNode.displayName = "BaseExecutionNode"