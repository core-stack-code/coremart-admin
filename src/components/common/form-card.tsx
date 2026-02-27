import React from 'react'
import { cn } from '@/lib/utils';

import { 
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@ui/card'
import { Typography } from '@ui/typography';

interface FormCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    contentClass?: string;
}


const FormCard: React.FC<FormCardProps> = ({ title, description, children, contentClass }) => {
    return (
        <Card className="shadow-sm border-muted/60">
            <CardHeader className="bg-muted/20 border-b">
                <CardTitle>
                    <Typography variant="lead" className='text-foreground'>{title}</Typography>
                </CardTitle>
                {description && (
                    <CardDescription>
                        <Typography variant="small">{description}</Typography>
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className={cn("", contentClass)}>
                {children}
            </CardContent>
        </Card>
    )
}

export default FormCard