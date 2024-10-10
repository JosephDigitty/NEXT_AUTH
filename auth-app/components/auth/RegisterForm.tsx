"use client"
import { useTransition, useState } from "react"
import { CardWrapper } from "./CardWrapper"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form,FormControl, FormField,FormItem,FormLabel,FormMessage } from "../ui/form"
import * as z from "zod"
import { RegisterSchema } from "@/Schemas"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../FormError"
import { FormSuccess } from "../FormSuccess"
import { register } from "@/actions/register"


export const RegisterForm  = () => {

  const [isPending, startTransition,] = useTransition()
  const [error, setError] =  useState<string|undefined>("")
  const [success, setSuccess] =  useState<string|undefined>("")
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    }
  })

  const onSubmit =  (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")
    startTransition(async () => {
      try {
        const data = await register(values); // Wait for the async login function
        setError(data.error);  // Assuming `data.error` is the error message
        setSuccess(data.success);  // Assuming `data.success` is the success message
      } catch (err) {
        setError("An error occurred during login."); // Handle any errors from the login function
      }
    });
  }
  return(
    <CardWrapper
    headerLabel="Create an account"
    backButtonLabel="Already have an account"
    backButtonHref="/auth/login"
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
                  <FormMessage/>

                </FormItem>
              )}
              />
              <FormField control={form.control} name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                    {...field}
                    disabled={isPending}
                    placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage/>

                </FormItem>
              )}
              />
            </div>
              <FormError message={error}/>
              <FormSuccess message={success}/>
            <Button
            type="submit"
            className="w-full"
            >
               Register
            </Button>
          </form>
        </Form>
    </CardWrapper>
  )
}