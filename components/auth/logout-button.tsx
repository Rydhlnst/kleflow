'use client'

import React from 'react'
import { Button } from '../ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

const LogoutButton = () => {
    const router = useRouter()
  return (
    <Button onClick={async () => {
        await authClient.signOut();
        router.push("/login");
    }}>
      Logout
    </Button>
  )
}

export default LogoutButton
