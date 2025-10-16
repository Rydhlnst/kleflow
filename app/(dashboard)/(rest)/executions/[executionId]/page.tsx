import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

interface PageProps {
    params: Promise<{
        executionId: string
    }>
}

const ExecutionIDPage = async ({params}: PageProps) => {
  await requireAuth()
    const {executionId} = await params
  return (
    <div>
      <p>
        Credential ID: {executionId}
      </p>
    </div>
  )
}

export default ExecutionIDPage
