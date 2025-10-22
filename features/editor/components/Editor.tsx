"use client"

import { ErrorView, LoadingView } from '@/components/entiity-components'
import { useSuspenseWorkflow } from '@/features/workflows/hooks/use-workflow'
import React from 'react'

export const EditorLoading = () => {
    return <LoadingView message='Loading editor...'/>
}

export const EditorError = () => {
    return <ErrorView message='Editor error'/>
}

const Editor = ({workflowId}: {workflowId: string}) => {

    const {data: workflow} = useSuspenseWorkflow(workflowId)

  return (
    <div>
      <p>
        {JSON.stringify(workflow, null, 2)}
      </p>
    </div>
  )
}

export default Editor
