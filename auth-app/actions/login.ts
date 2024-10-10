"use server"
import {signIn} from "@/auth"
import * as z from "zod"
import { LoginSchema } from "@/Schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import {generateVerificationToken} from "@/lib/tokens"
import {getUserByEmail} from "@/data/user"
import {sendVerificationEmail} from "@/lib/mail"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success) {
        return {error: "Invalid fields"}
    }
    const {email, password} = validatedFields.data
    const existingUser = await getUserByEmail(email)
    if(!existingUser || !existingUser.email || !existingUser.Password ) {
        return {erro: "Email Does not exit"}
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)
        await sendVerificationEmail (
            verificationToken.email,
            verificationToken.token,
        )
        return {success: "Confirmation Email Sent" }
    }
        
    
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
        return {success: "Logged in successfully" }
    } catch (error) {
            if(error instanceof AuthError){
                switch (error.type) {
                    case "CredentialsSignin":
                    return {error: "Invalid Credentials"}
                    default: 
                    return {error: "An error occurred"}
                }
            }
            throw error
    }
}