"use client";
import React from 'react';
import { useGetProfile } from '../api/query';

import PageTitle from '@/components/common/page-title';
import ErrorBlock from '@/components/common/error-block';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

import ProfileSettingsForm from './profile-settings-form';
import ChangePasswordForm from './change-password-form';

const ProfilePageCom: React.FC = () => {
    const { data, isLoading, error } = useGetProfile();

    const getContent = () => {
        if (isLoading) {
            return (
                <div className="space-y-8 min-h-[500px]">
                    <Skeleton className="h-[300px] w-full rounded-xl" />
                    <Skeleton className="h-[400px] w-full rounded-xl" />
                </div>
            );
        }

        if (error || !data || !data.data) {
            return <ErrorBlock message={error?.message || "Failed to load profile"} />;
        }

        const profile = data.data;

        return (
            <div className="space-y-8 pb-10">
                <ProfileSettingsForm profile={profile} />
                
                <Separator className="my-8" />
                
                <ChangePasswordForm />
            </div>
        );
    };

    return (
        <section className="space-y-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <PageTitle
                title="Admin Profile"
                subtitle="Manage your personal information and security settings."
            />
            {getContent()}
        </section>
    );
};

export default ProfilePageCom;
