"use client";
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { changePasswordSchema, ChangePasswordFormType } from '@/lib/zod/password';
import { useChangePassword } from '../api/mutation';
import { useToast } from '@/hooks/useToast';

import FormCard from '@composite/form-card';
import InputField from '@/components/form/input-field';
import { Button } from '@/components/ui/button';
import Icon from '@/components/icons';

const ChangePasswordForm: React.FC = () => {
    const { success, error: toastError } = useToast();
    
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const togglePassword = (field: keyof typeof showPassword) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const { control, handleSubmit, reset, formState: { errors } } = useForm<ChangePasswordFormType>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        }
    });

    const { mutate, isPending } = useChangePassword({
        onSuccess: () => {
            success("Password changed successfully");
            reset();
        },
        onError: (error) => {
            toastError(error.message || "Failed to change password");
        }
    });

    const onSubmit = (data: ChangePasswordFormType) => {
        mutate(data);
    };

    return (
        <FormCard 
            title="Change Password" 
            description="Update your password to keep your account secure."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-6 px-2 pb-6 max-w-lg">
                <Controller
                    name="currentPassword"
                    control={control}
                    render={({ field }) => (
                        <div className="relative">
                            <InputField
                                {...field}
                                type={showPassword.current ? "text" : "password"}
                                label="Current Password"
                                placeholder="Enter current password"
                                errMsg={errors.currentPassword?.message}
                                leftIcon="Lock"
                                className="pr-10"
                            />
                            <button 
                                type="button"
                                className="absolute right-3 top-[34px] text-muted-foreground hover:text-foreground"
                                onClick={() => togglePassword('current')}
                            >
                                <Icon name={showPassword.current ? "EyeOff" : "Eye"} width={16} height={16} />
                            </button>
                        </div>
                    )}
                />

                <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => (
                        <div className="relative mt-2">
                            <InputField
                                {...field}
                                type={showPassword.new ? "text" : "password"}
                                label="New Password"
                                placeholder="Enter new password"
                                errMsg={errors.newPassword?.message}
                                leftIcon="Lock"
                                className="pr-10"
                            />
                            <button 
                                type="button"
                                className="absolute right-3 top-[34px] text-muted-foreground hover:text-foreground"
                                onClick={() => togglePassword('new')}
                            >
                                <Icon name={showPassword.new ? "EyeOff" : "Eye"} width={16} height={16} />
                            </button>
                        </div>
                    )}
                />

                <Controller
                    name="confirmNewPassword"
                    control={control}
                    render={({ field }) => (
                        <div className="relative mt-2">
                            <InputField
                                {...field}
                                type={showPassword.confirm ? "text" : "password"}
                                label="Confirm New Password"
                                placeholder="Confirm new password"
                                errMsg={errors.confirmNewPassword?.message}
                                leftIcon="Lock"
                                className="pr-10"
                            />
                            <button 
                                type="button"
                                className="absolute right-3 top-[34px] text-muted-foreground hover:text-foreground"
                                onClick={() => togglePassword('confirm')}
                            >
                                <Icon name={showPassword.confirm ? "EyeOff" : "Eye"} width={16} height={16} />
                            </button>
                        </div>
                    )}
                />

                <div className="pt-2">
                    <Button type="submit" disabled={isPending} variant="default">
                        {isPending ? (
                            <>
                                <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            "Change Password"
                        )}
                    </Button>
                </div>
            </form>
        </FormCard>
    );
};

export default ChangePasswordForm;
