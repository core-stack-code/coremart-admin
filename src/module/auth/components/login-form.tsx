'use client'
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useLogin } from "../api/mutation"
import { LoginFormType, loginSchema } from "../utils/schema"
import { flatZodError } from "@/lib/zod/flatZodError"
import { useToast } from "@/hooks/useToast"

import InputField from "@/components/form/input-field"
import { Button } from "@/components/ui/button"
import DemoAdminButton from "./demo-admin-btn"


const LoginForm: React.FC = () => {
    const { mutate, isPending } = useLogin();
    const router = useRouter();
    const toast = useToast()

    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema)
    })
    const { control, getValues, handleSubmit, formState: { errors } } = form


    const onSubmit = (formData: LoginFormType) => {
        mutate(formData, {
            onSuccess: (data) => {
                toast.success(data.message)
                router.push('/')
            },
            onError: (error) => {
                if (error?.code !== "UNAUTHORIZED") {
                    toast.error(error?.message || "Login failed");
                }
            }
        })
    }


    useEffect(() => {
        if(Object.entries(errors).length > 0) {
            const errMsg = flatZodError(loginSchema, getValues())
            if(errMsg) toast.error(errMsg)
        }
    }, [errors])

    toast.isLoading(isPending, "Logging in...")


    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="email"
                render={({ field, formState }) => (
                    <InputField
                        id="email"
                        type="email"
                        label="Email"
                        placeholder="m@example.com"
                        value={field.value}
                        onChange={field.onChange}
                        errMsg={formState.errors.email?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name="password"
                render={({ field, formState }) => (
                    <InputField
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="****"
                        onChange={field.onChange}
                        value={field.value}
                        errMsg={formState.errors.password?.message}
                    />
                )}
            />
            <Button type="submit">Login</Button>
            <DemoAdminButton />
        </form>
    )
}

export default LoginForm
