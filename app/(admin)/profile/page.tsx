import React from 'react'
import { Metadata } from 'next';

import ProfilePageCom from '@/module/auth/components/profile-page-com';

export const metadata: Metadata = {
    title: 'Profile | CoreMart Admin',
    description: 'Admin user profile settings',
};

const ProfilePage: React.FC = () => {
    return (
        <ProfilePageCom />
    )
}

export default ProfilePage
