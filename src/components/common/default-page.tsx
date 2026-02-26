import React from 'react'
import { Typography } from '../ui/typography'

const DefaultPage: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className='w-full h-screen flex items-center justify-center bg-blue-200 overflow-y-auto scroll-container'>
            <Typography className="text-2xl font-bold">{title}</Typography>
        </div>
    )
}

export default DefaultPage
