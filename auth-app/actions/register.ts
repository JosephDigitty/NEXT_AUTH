"use server"

import * as z from "zod"
import { RegisterSchema } from "@/Schemas"
import  bcrypt  from "bcryptjs"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import {generateVerificationToken} from "@/lib/tokens"
import {sendVerificationEmail} from "@/lib/mail"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success) {
        return {error: "Invalid fields"}
        
    }

    const{email,name,password} = validatedFields.data
    console.log("Password before hashing:", password);
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("Hashed password:", hashedPassword)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
            return {error: "Email already in use!"}
    }

    await db.user.create({
        data: {
            name,
            email,
            Password: hashedPassword
        }  
    })
     const verificationToken = await generateVerificationToken(email) 
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
    ) 

    return {success: "Confirmation Email Sent" }
}