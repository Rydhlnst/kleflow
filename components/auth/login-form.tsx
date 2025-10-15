"use client"

import React from "react"
import z from "zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { FaGithub, FaGoogle } from "react-icons/fa"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm = () => {
  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/")
        },
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
      }
    )
  }

  const isPending = form.formState.isSubmitting

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md border border-border/50 shadow-md rounded-2xl">
        <CardHeader className="text-center space-y-2 pb-2">
          <CardTitle className="text-2xl font-semibold tracking-tight">Welcome Back 👋</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Sign in to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 font-medium"
              type="button"
              disabled={isPending}
            >
              <FaGithub className="size-4" />
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 font-medium"
              type="button"
              disabled={isPending}
            >
              <FaGoogle className="size-4" />
              Continue with Google
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/60"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground rounded-full">or continue with</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="johndoe@example.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full font-semibold" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm
