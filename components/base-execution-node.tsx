"use client"

import { type NodeProps, Position } from "@xyflow/react"
import type { LucideIcon } from "lucide-react"
import {memo, type ReactNode} from "react"
import { WorkflowNode } from "./workflow-node";
import { BaseNode, BaseNodeContent } from "./react-flow/base-node";
import Image from "next/image";
import { BaseHandle } from "./base-handle";

interface BaseExecutionNodeProps extends NodeProps {
    icon: LucideIcon | string;
    name: string;
    description?: string;
    children?: ReactNode;
    // status?: NodeStatus;
    onSetting?: () => void;
    onDoubleClick?: () => void;
}

export const BaseExecutionNode = memo(({id, name, icon: Icon, description, children, onSetting, onDoubleClick}: BaseExecutionNodeProps) => {
    return (
        <WorkflowNode
            name={name}
            description={description}
            onDelete={() => {}}
            onSettings={onSetting}
        >
            <BaseNode onDoubleClick={onDoubleClick}>
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
        </WorkflowNode>
    )
})

BaseExecutionNode.displayName = "BaseExecutionNode"