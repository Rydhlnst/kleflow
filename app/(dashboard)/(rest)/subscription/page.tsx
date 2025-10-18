import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'

const SubscriptionPage = () => {
    const trpc = useTRPC()
    // const testAI = useMutation(trpc.testAi.mutationOptions({
    //     onSuccess: () => {
    //         toast.success("Sucess")
    //     },
    //     onError: ({message}) => {
    //         toast.error("Error " + message)
    //     }
    // }))
  return (
    // <Button onClick={() => testAI.mutate()}>
    //   Click to test
    // </Button>
    <div>
      
    </div>
  )
}

export default SubscriptionPage
