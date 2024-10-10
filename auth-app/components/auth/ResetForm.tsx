"use client"
import { useTransition, useState } from "react"
import { CardWrapper } from "./CardWrapper"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form,FormControl, FormField,FormItem,FormLabel,FormMessage } from "../ui/form"
import * as z from "zod"
import { ResetSchema } from "@/Schemas"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../FormError"
import { FormSuccess } from "../FormSuccess"
import { login } from "@/actions/login"



export const ResetForm  = () => {
  const [isPending, startTransition,] = useTransition()
  const [error, setError] =  useState<string|undefined>("")
  const [success, setSuccess] =  useState<string|undefined>("")
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    }
  })

  const onSubmit =  (values: z.infer<typeof ResetSchema>) => {
    setError("")
    setSuccess("")
    console.log(values)
    // startTransition(async () => {
    //   try {
    //     const data = await login(values); // Wait for the async login function
    //     setError(data.error);  // Assuming `data.error` is the error message
    //     setSuccess(data.success);  // Assuming `data.success` is the success message
    //   } catch (err) {
    //     setError("An error occurred during login."); // Handle any errors from the login function
    //   }
    // });
  }
  return(
    <CardWrapper
    headerLabel="forgot your passowrd"
    backButtonLabel="Back to login"
    backButtonHref="/auth/login"
    
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
            </div>
              <FormError message={error}/>
              <FormSuccess message={success}/>
            <Button
            type="submit"
            className="w-full"
            >
               Send Reset Email
            </Button>
          </form>

        </Form>
    </CardWrapper>
  )
}