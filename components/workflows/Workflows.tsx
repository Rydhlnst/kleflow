"use client"

import { useCreateWorkflows, useSuspenseWorkflows } from '@/features/workflows/hooks/use-workflow'
import React from 'react'
import { EntityContainer, EntityHeader } from '../entiity-components'
import { useUpgradeModal } from '@/hooks/use-upgrade-modal'
import { useRouter } from 'next/navigation'

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows()
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <p>
        {JSON.stringify(workflows.data, null, 2)}
      </p>
    </div>
  )
}

const WorkflowsHeader = ({disabled}: {disabled?: boolean}) => {

  const router = useRouter()
  const createWorkflows = useCreateWorkflows();
  const {handleError, modal} = useUpgradeModal()

  const handleCreate = () => {
    createWorkflows.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`)
      },
      onError: (error) => {
        handleError(error)
      }
    })
  }

  return (
    <>
      <EntityHeader
        title="Workflows"
        description='Create and manage your workflows'
        onNew={handleCreate}
        newButtonLabel='New Workflow'
        disabled={createWorkflows.isPending}
        isCreating={false}
        />
        {modal}
    </>
  )
}

export const WorkflowsContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader/>}
      search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  )
}