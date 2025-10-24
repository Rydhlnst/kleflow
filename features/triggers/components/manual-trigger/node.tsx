import { BaseTriggerNode } from "@/components/base-trigger-node";
import {  NodeProps } from "@xyflow/react";
import { MousePointerIcon } from "lucide-react";
import { memo } from "react";


export const ManualTriggerNode = memo((props: NodeProps) => {
    return (
        <>
            <BaseTriggerNode
                {...props}
                id={props.id}
                icon={MousePointerIcon}
                name="When clicking 'Execute Workflow'"
                // status={nodeStatus}
                // description={description}
                // onSetting={() => {}}
                // onDoubleClick={() => {}}
            />
        </>
    )

})

ManualTriggerNode.displayName = "ManualTriggerNode"