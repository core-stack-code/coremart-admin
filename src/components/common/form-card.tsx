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
    headerAction?: React.ReactNode;
}


const FormCard: React.FC<FormCardProps> = ({ title, description, children, contentClass, headerAction }) => {
    return (
        <Card className="shadow-sm border-muted/60 bg-background">
            <CardHeader className="bg-muted/20 border-b flex flex-row items-start justify-between gap-4">
                <div className="space-y-1.5">
                    <CardTitle>
                        <Typography variant="lead" className='text-foreground'>{title}</Typography>
                    </CardTitle>
                    {description && (
                        <CardDescription>
                            <Typography variant="small">{description}</Typography>
                        </CardDescription>
                    )}
                </div>
                {headerAction && (
                    <div className="mt-0">
                        {headerAction}
                    </div>
                )}
            </CardHeader>
            <CardContent className={cn("", contentClass)}>
                {children}
            </CardContent>
        </Card>
    )
}

export default FormCard