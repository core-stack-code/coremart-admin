import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import Icon from '@/components/icons';

interface ErrorBlockProps {
    title?: string;
    message?: string;
}

const ErrorBlock: React.FC<ErrorBlockProps> = ({ 
    title = "Something went wrong", 
    message = "An error occurred while loading this section. Please try again later." 
}) => {
    return (
        <Card className="w-full border-destructive/20 bg-destructive/10">
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <Icon name="AlertTriangle" className="h-10 w-10 text-destructive mb-4" />
                <Typography variant="h4" className="mb-2">{title}</Typography>
                <Typography variant="muted" className="text-muted-foreground">{message}</Typography>
            </CardContent>
        </Card>
    );
};

export default ErrorBlock;
