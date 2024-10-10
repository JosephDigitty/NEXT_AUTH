"use client"
import { useTransition, useState } from "react"
import { CardWrapper } from "./CardWrapper"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form,FormControl, FormField,FormItem,FormLabel,FormMessage } from "../ui/form"
import * as z from "zod"
import { LoginSchema } from "@/Schemas"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../FormError"
import { FormSuccess } from "../FormSuccess"
import { login } from "@/actions/login"
import { useSearchParams } from "next/navigation"
import Link from "next/link"


export const LoginForm  = () => {

  const searchParams = useSearchParams()
  const urlError = searchParams.get("eror") === "OAuthAccountNotLinked"
  ? "Email already in use with different Provider" : ""

  const [isPending, startTransition,] = useTransition()
  const [error, setError] =  useState<string|undefined>("")
  const [success, setSuccess] =  useState<string|undefined>("")
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit =  (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")
    startTransition(async () => {
      try {
        const data = await login(values); // Wait for the async login function
        setError(data.error);  // Assuming `data.error` is the error message
        setSuccess(data.success);  // Assuming `data.success` is the success message
      } catch (err) {
        setError("An error occurred during login."); // Handle any errors from the login function
      }
    });
  }
  return(
    <CardWrapper
    headerLabel="welcome back"
    backButtonLabel="dont have an account?"
    backButtonHref="/auth/register"
    showSocial
    >
        <Form {...form}>
          <form 
          className="space-y-6 "
          onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField control={form.control} name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                    {...field}
                    disabled={isPending}
                    placeholder="john.doe@example.com"
                    type="email"
                    />
                  </FormControl>
                  <FormMessage/>

                </FormItem>
              )}
              />
              <FormField control={form.control} name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                    {...field}
                    disabled={isPending}
                    placeholder="**********"
                    type="password"
                    />
                  </FormControl>
                  <Button size='sm'
                  variant='link' 
                  asChild
                  className="px-0 font-normal">
                    <Link href='/auth/reset'>
                    forgot password?
                    </Link>
                  </Button>
                  <FormMessage/>
                </FormItem>
              )}
              />
            </div>
              <FormError message={error || urlError}/>
              <FormSuccess message={success}/>
            <Button
            type="submit"
            className="w-full"
            >
               Login
            </Button>
          </form>

        </Form>
    </CardWrapper>
  )
}