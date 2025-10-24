import { InitialNode } from "@/components/initial-node";
import { HTTPRequestNode } from "@/features/executions/components/http-request/node";
import { ManualTriggerNode } from "@/features/triggers/components/manual-trigger/node";
import { NodeType } from "@/lib/generated/prisma";
import { NodeTypes } from "@xyflow/react";

export const NodeComponents = {
    [NodeType.INITITAL]: InitialNode,
    [NodeType.HTTP_REQUEST]: HTTPRequestNode,
    [NodeType.MANUAL_TYPES]: ManualTriggerNode,

} as const satisfies NodeTypes;

export type RegisteredNoteType = keyof typeof NodeComponents