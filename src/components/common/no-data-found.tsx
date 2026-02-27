import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import Icon from '@/components/icons';

interface NoDataFoundProps {
    title?: string;
    description?: string;
}

const NoDataFound: React.FC<NoDataFoundProps> = ({
    title = "No Data Found",
    description = "There are currently no items to display."
}) => {
    return (
        <Card className="w-full border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-muted p-4 rounded-full mb-4">
                    <Icon name="SearchX" className="h-10 w-10 text-muted-foreground" />
                </div>
                <Typography variant="h4" className="mb-2">{title}</Typography>
                <Typography variant="muted" className="text-muted-foreground max-w-sm">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NoDataFound;
