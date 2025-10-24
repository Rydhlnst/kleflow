"use client"

import { type NodeProps, Position } from "@xyflow/react"
import type { LucideIcon } from "lucide-react"
import {memo, type ReactNode} from "react"
import { WorkflowNode } from "./workflow-node";
import { BaseNode, BaseNodeContent } from "./react-flow/base-node";
import Image from "next/image";
import { BaseHandle } from "./base-handle";

interface BaseTriggerNodeProps extends NodeProps {
    icon: LucideIcon | string;
    name: string;
    description?: string;
    children?: ReactNode;
    // status?: NodeStatus;
    onSetting?: () => void;
    onDoubleClick?: () => void;
}

export const BaseTriggerNode = memo(({id, name, icon: Icon, description, children, onSetting, onDoubleClick}: BaseTriggerNodeProps) => {
    return (
        <WorkflowNode
            name={name}
            description={description}
            onDelete={() => {}}
            onSettings={onSetting}
        >
            <BaseNode onDoubleClick={onDoubleClick} className="rounded-l-2xl relative group">
                <BaseNodeContent>
                    {typeof Icon === "string" ? (
                        <Image src={Icon} alt={name} width={16} height={16}/>
                    ) : (
                        <Icon className="size-4 text-muted-foreground"/>
                    )} 
                    {children}
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

BaseTriggerNode.displayName = "BaseExecutionNode"