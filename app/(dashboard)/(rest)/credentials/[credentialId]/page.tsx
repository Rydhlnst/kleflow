import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

interface PageProps {
    params: Promise<{
        credentialId: string
    }>
}

const CredentialIDPage = async ({params}: PageProps) => {
  await requireAuth()
    const {credentialId} = await params
  return (
    <div>
      <p>
        Credential ID: {credentialId}
      </p>
    </div>
  )
}

export default CredentialIDPage
