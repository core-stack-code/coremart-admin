"use client";
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { updateProfile, UpdateProfileFormType } from '../utils/schema';
import { useUpdateProfile } from '../api/mutation';
import { ProfileResponse } from '../api/type';
import { useToast } from '@/hooks/useToast';

import FormCard from '@/components/common/form-card';
import InputField from '@/components/form/input-field';
import ProfilePictureUpload from './profile-picture-upload';
import Icon from '@/components/icons';
import { Button } from '@/components/ui/button';

interface ProfileSettingsFormProps {
    profile: ProfileResponse;
}

const ProfileSettingsForm: React.FC<ProfileSettingsFormProps> = ({ profile }) => {
    const { success, error: toastError } = useToast();
    
    const { control, handleSubmit, formState: { errors } } = useForm<UpdateProfileFormType>({
        resolver: zodResolver(updateProfile),
        defaultValues: {
            name: profile.name || '',
            imageUrl: profile.imageUrl || '',
        }
    });

    const { mutate, isPending } = useUpdateProfile({
        onSuccess: () => {
            success("Profile updated successfully");
        },
        onError: (error) => {
            toastError(error.message || "Failed to update profile");
        }
    });

    const onSubmit = (data: UpdateProfileFormType) => {
        mutate({ ...profile, name: data.name || profile.name, imageUrl: data.imageUrl || profile.imageUrl || null });
    };


    return (
        <FormCard 
            title="Profile Information" 
            description="Update your basic profile information and image."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-6 px-2 pb-6">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="shrink-0">
                        <Controller
                            name="imageUrl"
                            control={control}
                            render={({ field }) => (
                                <ProfilePictureUpload
                                    value={field.value}
                                    onChange={field.onChange}
                                    errMsg={errors.imageUrl?.message}
                                />
                            )}
                        />
                    </div>
                    
                    <div className="flex-1 w-full space-y-5 mt-2 md:mt-0">
                        <div className="space-y-4 max-w-lg">
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        value={field.value || ''}
                                        label="Full Name"
                                        placeholder="Enter your full name"
                                        errMsg={errors.name?.message}
                                        leftIcon="User"
                                    />
                                )}
                            />
                            
                            <InputField
                                label="Email Address"
                                value={profile.email}
                                onChange={() => {}}
                                disabled
                                leftIcon="Mail"
                                className="opacity-60 cursor-not-allowed bg-muted/50"
                            />
                        </div>

                        <div className="pt-2">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </FormCard>
    );
};

export default ProfileSettingsForm;
