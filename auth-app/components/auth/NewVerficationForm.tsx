"use client"

import {BeatLoader} from "react-spinners"
import { CardWrapper } from "./CardWrapper"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState} from "react"
import { newVerification } from "@/actions/newVerification"
import { FormError } from "../FormError"
import { FormSuccess } from "../FormSuccess"


export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)

    const searchParams = useSearchParams()

    const token = searchParams.get("token")
    
    const onSubmit = useCallback(() => {
        if(success ||error) return
        if(!token) {
            setError("Invalid token")
            return
        }
        newVerification(token).then((data) => {
           setSuccess(data.sucess)
           setError(data.error)
        })
        .catch(() => {
            setError("Token doesnt exist")

        })
    }, [token])
    
    useEffect(() =>{
        onSubmit()
    }, [onSubmit])
    return (
        <CardWrapper
        headerLabel="confirming your verification"
        backButtonHref="/auth/login"
        backButtonLabel="Bact to login"
        > 
        <div className="flex items-center w-full justify-center">
            {!success && !error && (
                <BeatLoader/>
            )}
            <FormSuccess message={success}/>
            <FormError message={error}/>
        </div>  
        
        </CardWrapper>
    )
}