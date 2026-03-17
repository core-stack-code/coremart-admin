'use client'
import React from 'react'
import { useDemoLogin } from '../api/mutation'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/useToast'
import { Button } from '@ui/button'

const DemoAdminButton: React.FC = () => {
    const { mutate, isPending } = useDemoLogin()
    const router = useRouter();
    const toast = useToast()

    const handleClick = () => {
        mutate(undefined, {
            onSuccess: () => {
                toast.success("Demo admin login successful")
                router.push("/")
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    }

    toast.isLoading(isPending, "Logging in...")

    return (
        <Button 
            type='button' 
            onClick={handleClick} 
            disabled={isPending}
            variant="outline"
        >
            {isPending ? "Logging in..." : "Login as Demo Admin"}
        </Button>
    )
}

export default DemoAdminButton