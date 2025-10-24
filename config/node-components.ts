import { InitialNode } from "@/components/initial-node";
import { NodeType } from "@/lib/generated/prisma";
import { NodeTypes } from "@xyflow/react";

export const NodeComponents = {
    [NodeType.INITITAL]: InitialNode,
} as const satisfies NodeTypes;

export type RegisteredNoteType = keyof typeof NodeComponents