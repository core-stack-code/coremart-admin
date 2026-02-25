import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import InputField from "@/components/form/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
                </CardHeader>
                <CardContent>
                <form>
                    <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <InputField
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            onChange={() => {}}
                            value=""
                            required
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <InputField id="password" type="password" placeholder="****" required onChange={() => {}}
                            value="" />
                    </Field>
                    <Field>
                        <Button type="submit">Login</Button>
                    </Field>
                    </FieldGroup>
                </form>
                </CardContent>
            </Card>
        </div>
    )
}
