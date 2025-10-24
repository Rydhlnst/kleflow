"use client"

import type { NodeProps } from "@xyflow/react"
import {memo, useState} from "react"
import { PlaceholderNode } from "./react-flow/placeholder-node"
import { PlusIcon } from "lucide-react"
import { WorkflowNode } from "./workflow-node"
import NodeSelector from "./node-selector"

export const InitialNode = memo((props: NodeProps) => {
    const [selectorOpen, setSelectorOpen] = useState(false);
    return (
        <NodeSelector onOpenChange={setSelectorOpen} open={selectorOpen}>
            <WorkflowNode name="Initial Node" description="Click to add a node">
                <PlaceholderNode
                    onClick={() => setSelectorOpen(true)}
                    {...props}
                >
                    <div className="cursor-pointer flex items-center justify-center">
                        <PlusIcon className="cursor-pointer size-4"/>
                    </div>
                </PlaceholderNode>
            </WorkflowNode>
        </NodeSelector>
    )
})

InitialNode.displayName = "InitialNode"