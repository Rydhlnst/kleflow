"use client"

import { useCreateWorkflows, useSuspenseWorkflows } from '@/features/workflows/hooks/use-workflow'
import React from 'react'
import { EntityContainer, EntityHeader, EntityPagination, EntitySearch } from '../entiity-components'
import { useUpgradeModal } from '@/hooks/use-upgrade-modal'
import { useRouter } from 'next/navigation'
import { useWorkflowsParams } from '@/features/workflows/hooks/use-workflows-params'
import { useEntitySearch } from '@/features/workflows/hooks/use-entity-search'

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
      search={<WorkflowsSearch/>}
      pagination={<WorkflowPagination/>}
    >
      {children}
    </EntityContainer>
  )
}

export const WorkflowsSearch = () => {

  const [params, setParams] = useWorkflowsParams();
  const {onSearchChange, searchValue} = useEntitySearch({
    params, setParams
  })

  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder='Search Workflows'
    />
  )
}

export const WorkflowPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();

  return (
    <EntityPagination
      disabled={workflows.isFetching}
      totalPages={workflows.data.totalPages}
      page={workflows.data.page}
      onPageChange={(page) => setParams({...params, page})}
    />
  )
}