import { BaseTriggerNode } from "@/components/base-trigger-node";
import {  NodeProps } from "@xyflow/react";
import { MousePointerIcon } from "lucide-react";
import { memo, useState } from "react";
import ManualTriggerDialog from "./dialog";


export const ManualTriggerNode = memo((props: NodeProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const nodeStatus = "loading";

    const handleOpenSettings = () => setDialogOpen(true)
    return (
        <>
            <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen}/>
            <BaseTriggerNode
                {...props}
                id={props.id}
                icon={MousePointerIcon}
                name="When clicking 'Execute Workflow'"
                status={nodeStatus}
                // description={description}
                onSetting={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
            />
        </>
    )

})

ManualTriggerNode.displayName = "ManualTriggerNode"