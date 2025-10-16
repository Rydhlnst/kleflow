import React from 'react'

interface PageProps {
    params: Promise<{
        workflowId: string
    }>
}

const ExecutionIDPage = async ({params}: PageProps) => {
    const {workflowId} = await params
  return (
    <div>
      <p>
        Credential ID: {workflowId}
      </p>
    </div>
  )
}

export default ExecutionIDPage
