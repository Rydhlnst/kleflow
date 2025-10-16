import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

const WorkflowPage = async () => {
  await requireAuth()
  return (
    <div>
      <h1>Workflows</h1>
    </div>
  )
}

export default WorkflowPage
