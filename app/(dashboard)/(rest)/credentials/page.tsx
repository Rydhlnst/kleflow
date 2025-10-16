import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

const CredentialsPage = async () => {
  await requireAuth()
  return (
    <div>
      
    </div>
  )
}

export default CredentialsPage
