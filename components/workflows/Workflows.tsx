"use client"

import { useCreateWorkflows, useRemoveWorkflows, useSuspenseWorkflows } from '@/features/workflows/hooks/use-workflow'
import React from 'react'
import { EmptyView, EntityContainer, EntityHeader, EntityItem, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from '../entiity-components'
import { useUpgradeModal } from '@/hooks/use-upgrade-modal'
import { useRouter } from 'next/navigation'
import { useWorkflowsParams } from '@/features/workflows/hooks/use-workflows-params'
import { useEntitySearch } from '@/features/workflows/hooks/use-entity-search'
import { Workflow } from '@/lib/generated/prisma'
import { WorkflowIcon } from 'lucide-react'
import { formatDistanceToNow } from "date-fns"

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows()

  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorkflowItem data={workflow}/>}
      emptyView={<WorkflowEmpty/>}
    />
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

export const WorkflowLoading = () => {
  return <LoadingView message='Loading workflows...'/>
}

export const WorkflowError = () => {
  return <ErrorView message='Error loading workflows...'/>
}

export const WorkflowEmpty = () => {

  const createWorkflow = useCreateWorkflows();
  const { handleError, modal} = useUpgradeModal();

  const router = useRouter()

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        handleError(error)
      },
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`)
      }
    })
  }

  return (
    <>
      {modal}
      <EmptyView
        onNew={handleCreate}
        message="You haven't created any workflows yet. Get started by creating your first workflow"
      />
    </>
  ) 
}

export const WorkflowItem = ({data}: {data: Workflow}) => {

  const removeWorkflow = useRemoveWorkflows()

  const handleRemove = () => {
    removeWorkflow.mutate({id: data.id})
  }

  return (
    <EntityItem
      href={`/workflows/${data.id}`}
      title={data.name}
      subtitle={
        <>
          Updated {formatDistanceToNow(data.updatedAt, {addSuffix: true})}{" "}
          &bull; Created{" "}
          {formatDistanceToNow(data.createdAt, {addSuffix: true})}
        </>
      }
      image={
        <div className='size-8 flex items-center justify-center'>
          <WorkflowIcon className='size-5 text-muted-foreground'/>
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeWorkflow.isPending}
    />
  )
}