"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { SaveIcon } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { useSuspenseWorkflow, useUpdateWorkflow, useUpdateWorkflowName } from '@/features/workflows/hooks/use-workflow'
import { Input } from '@/components/ui/input'
import { useAtomValue } from 'jotai'
import { editorAtom } from '../store/atoms'


export const EditorNameInput = ({workflowId}: {workflowId: string}) => {
    const {data: workflow} = useSuspenseWorkflow(workflowId);
    const updateWorkflow = useUpdateWorkflowName();

    const [isEditing, setisEditing] = useState(false);
    const [name, setName] = useState(workflow.name);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(workflow.name) {
            setName(workflow.name)
        }
    }, [workflow.name])

    useEffect(() => {
        if(isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing])

    const handleSave = async () => {
        if(name === workflow.name) {
            setisEditing(false);
            return;
        }
        try {
            await updateWorkflow.mutateAsync({
                id: workflowId,
                name,
            })
        } catch {
            setName(workflow.name)
        } finally {
            setisEditing(false)
        }
    }


    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.key === "Enter") {
            handleSave()
        } else if (e.key === "Escape") {
            setName(workflow.name);
            setisEditing(false)
        }
    }

    if (isEditing) {
        return (
            <Input disabled={updateWorkflow.isPending}
             className='h-7 w-auto min-w-[100px] px-2'
             onBlur={handleSave}
             onKeyDown={handleKeyDown}
             ref={inputRef} value={name}
             onChange={(e) => setName(e.target.value)}/>
        )
    }

    return (
        <BreadcrumbItem onClick={() => setisEditing(true)} className='cursor-pointer hover:text-foreground transition-colors'>
            {workflow.name}
        </BreadcrumbItem>
    )
}

export const EditorSaveButton = ({workflowId}: {workflowId: string}) => {
    const editor = useAtomValue(editorAtom);
    const saveWorkflow = useUpdateWorkflow();

    const handleSave = () => {
        if(!editor) {
            return;
        }

        const nodes = editor.getNodes();
        const edges = editor.getEdges();

        saveWorkflow.mutate({
            id: workflowId,
            nodes,
            edges,
        })
    }

    return (
        <div className='ml-auto'>
            <Button className='' size={"sm"} onClick={handleSave} disabled={saveWorkflow.isPending}>
                <SaveIcon className='size-4'/>
                Save
            </Button>
        </div>
    )
}

export const EditorBreadCrumbs = ({workflowId}: {workflowId: string}) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={"/workflows"} prefetch>
                            Workflows
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <EditorNameInput workflowId={workflowId}/>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

const EditorHeader = ({workflowId}: {workflowId: string}) => {
  return (
    <header className='flex h-14 shrink-0 items-center gap-2 borer-b px-4 bg-background'>
      <SidebarTrigger/>
      <div className='flex flex-row items-center justify-between gap-x-4 w-full'>
        <EditorBreadCrumbs workflowId={workflowId}/>
        <EditorSaveButton workflowId={workflowId}/>
      </div>
    </header>
  )
}

export default EditorHeader
