import React from 'react'
import { Typography } from '@ui/typography'

interface PageTitleProps {
    title: string;
    subtitle?: string;
    buttonNode?: React.ReactNode;
}


const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, buttonNode }) => {
    return (
        <div className="flex items-center justify-between">
            <div className='flex flex-col gap-1'>
                <Typography variant="h3">{title}</Typography>
                {subtitle && <Typography className='text-muted-foreground'>{subtitle}</Typography>}
            </div>
            {buttonNode}
        </div>
    )
}

export default PageTitle