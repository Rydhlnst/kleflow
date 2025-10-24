import React, { useCallback } from 'react'
import {createId} from "@paralleldrive/cuid2"
import { NodeType } from '@/lib/generated/prisma'
import { GlobeIcon, MousePointerIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import Image from 'next/image';
import { Separator } from './ui/separator';
import { useReactFlow } from '@xyflow/react';
import { toast } from 'sonner';

export type NodeTypeOption = {
    type: NodeType;
    label: string;
    description: string;
    icon: React.ComponentType<{className?: string}> | string;
}

const triggerNodes: NodeTypeOption[] = [
    {
        type: NodeType.MANUAL_TYPES,
        label: "Trigger Manually",
        description: "Runs the flow on clicking a button. Good for getting started quickly",
        icon: MousePointerIcon
    }
]

const executionNodes: NodeTypeOption[] = [
    {
        type: NodeType.HTTP_REQUEST,
        label: "HTTP Request",
        description: "Makes an HTTP Request",
        icon: GlobeIcon
    }
]

interface NodeSelectorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode
}

const NodeSelector = ({children, onOpenChange, open}: NodeSelectorProps) => {

    const {setNodes, getNodes, screenToFlowPosition} = useReactFlow();

     
    const handleNodeSelect = useCallback((nodeType: NodeTypeOption) => {
        // Check if trying to add a normal trigger when one already exist
        if(nodeType.type === NodeType.MANUAL_TYPES) {
            const nodes = getNodes();
            const hasManualTrigger = nodes.some(
                (node) => node.type === NodeType.MANUAL_TYPES
            );

            if(hasManualTrigger) {
                toast.error("Only one manual trigger is allowed per workflow")
            }
        }

        setNodes((nodes) => {
            const hasInitialTrigger = nodes.some((node) => node.type === NodeType.INITITAL)
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const flowPosition = screenToFlowPosition({
                x: centerX + (Math.random() - 0.5) * 200,
                y: centerY + (Math.random() - 0.5) * 200,
            });

            const newNode = {
                id: createId(),
                data: {},
                position: flowPosition,
                type: nodeType.type
            }

            if(hasInitialTrigger) {
                return [newNode];
            }

            return [...nodes, newNode];
        });

        onOpenChange(false);
    }, [setNodes, getNodes, onOpenChange, screenToFlowPosition])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent side='right' className='w-full sm:max-w-md overflow-y-auto'>
            <SheetHeader>
                <SheetTitle>
                    What triggers this workflow?
                </SheetTitle>
                <SheetDescription>
                    A trigger is a step that starts your workflow.
                </SheetDescription>
            </SheetHeader>
            <div className=''>
                {triggerNodes.map((nodeType) => {
                    const Icon = nodeType.icon;

                    return (
                        <div 
                        onClick={() => handleNodeSelect(nodeType)}
                        key={nodeType.type} className='w-full justify-start px-4 h-auto cursor-pointer border-l-2 py-5 rounded-none border-transparent hover:border-l-primary'>
                            <div className='flex items-center gap-6 w-full overflow-hidden'>
                                {typeof Icon === "string" ? (
                                    <Image
                                        width={20}
                                        height={20}
                                        src={Icon}
                                        alt={nodeType.label}
                                        className='size-5 object-contain rounded-sm'
                                    />
                                ) : (
                                    <Icon className='size-5'/>
                                )}
                            </div>
                            <div className='flex flex-col items-start text-left'>
                                <span className='font-medium text-sm'>
                                    {nodeType.label}
                                </span>
                                <span className='text-xs text-muted-foreground'>
                                    {nodeType.description}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Separator/>
            <div className=''>
                {executionNodes.map((nodeType) => {
                    const Icon = nodeType.icon;

                    return (
                        <div 
                        onClick={() => handleNodeSelect(nodeType)}
                        key={nodeType.type} className='w-full justify-start px-4 h-auto cursor-pointer border-l-2 py-5 rounded-none border-transparent hover:border-l-primary'>
                            <div className='flex items-center gap-6 w-full overflow-hidden'>
                                {typeof Icon === "string" ? (
                                    <Image
                                        width={20}
                                        height={20}
                                        src={Icon}
                                        alt={nodeType.label}
                                        className='size-5 object-contain rounded-sm'
                                    />
                                ) : (
                                    <Icon className='size-5'/>
                                )}
                            </div>
                            <div className='flex flex-col items-start text-left'>
                                <span className='font-medium text-sm'>
                                    {nodeType.label}
                                </span>
                                <span className='text-xs text-muted-foreground'>
                                    {nodeType.description}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </SheetContent>
    </Sheet>
  )
}

export default NodeSelector