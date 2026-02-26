import React from 'react'
import LoginForm from './login-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const LoginCard: React.FC = () => {
    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginCard
