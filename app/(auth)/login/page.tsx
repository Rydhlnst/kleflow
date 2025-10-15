import LoginForm from '@/components/auth/login-form'
import { requireUnauth } from '@/lib/auth-utils'
import React from 'react'

const LoginPage = async () => {
    await requireUnauth();
  return (
    <div>
      <LoginForm/>
    </div>
  )
}

export default LoginPage
