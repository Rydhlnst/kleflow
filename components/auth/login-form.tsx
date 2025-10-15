"use client"

import React from 'react'
import z from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required")
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm = () => {

    const router = useRouter();

    const form = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: LoginFormValues) => {
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            callbackURL: "/"
        }, {
            onSuccess: () => {
                router.push("/")
            },
            onError: (ctx) => {
                toast.error(ctx.error.message)
            }
        })
    }

    const isPending = form.formState.isSubmitting

  return (
    <div className='flex flex-col gap-6'>
      <Card>
        <CardHeader className='text-center'>
            <CardTitle>
                Welcome Back
            </CardTitle>
            <CardDescription>
                Login to Continue
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} action="">
                    <div className='grid gap-6'>
                        <div className='flex flex-col gap-4'>
                            <Button variant={"outline"} className='w-full' type='button' disabled={isPending}>
                                Continue with Github
                            </Button>
                            <Button variant={"outline"} className='w-full' type='button' disabled={isPending}>
                                Continue with Google
                            </Button>
                        </div>
                        <div className='grid gap-6'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='email'
                                                placeholder='johndoe@example.com'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                placeholder='********'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' className='w-full' disabled={isPending}>
                                Login
                            </Button>
                        </div>
                    </div>
                    <div className='text-center text-sm'>
                        Don&apos; have an account?{" "}
                        <Link href={"/register"} className='underline underline-offset-4'>
                            Sign Up
                        </Link>
                    </div>
                </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm
