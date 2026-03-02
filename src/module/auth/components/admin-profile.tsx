import React from 'react'
import { useGetProfile } from '../api/query';

import AdminDropdown from './admin-dropdown';
import Icon from '@/components/icons';
import { Typography } from '@ui/typography';
import { Skeleton } from '@ui/skeleton';


const AdminProfile: React.FC = () => {
    const { data, isLoading, error } = useGetProfile();

    const getContent = () => {
        if (isLoading) {
            return <Skeleton className='w-30 h-10 rounded-md' />
        }

        if (error || !data || !data.data) {
            return (
                <div className='flex gap-2 items-center h-10 px-4 py-2 rounded-md bg-destructive/10'>
                    <Icon name="OctagonX" width={20} height={20} className="text-destructive" />
                    <Typography variant="small" className='text-destructive w-full text-center'>
                        {error?.message || "Error loading profile"}
                    </Typography>
                </div>
            )
        }

        return <AdminDropdown name={data.data.name} imageUrl={data.data.imageUrl} />
    }

    return (
        <div className='py-2 px-4'>
            {getContent()}
        </div>
    )
}

export default AdminProfile
