import React from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from "next-themes"
import { useLogout } from '../api/mutation'
import { useModelStore } from '@/store'
import { useToast } from '@/hooks/useToast'

import Dropdown from '@composite/dropdown'
import Icon from '@/components/icons'
import { Avatar, AvatarImage } from '@ui/avatar'
import { Typography } from '@ui/typography'

interface AdminDropdownProps {
    name: string
    imageUrl: string | null
}


const AdminDropdown: React.FC<AdminDropdownProps> = ({ name, imageUrl }) => {
    const router = useRouter()
    const { resolvedTheme, setTheme } = useTheme()
    const { mutate } = useLogout()
    const showModel = useModelStore(s => s.showModel);
    const toast = useToast()

    const handleDarkModeToggle = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    const logout = () => {
        mutate(undefined, {
            onSuccess: () => {
                toast.success("Logout successfully")
                router.push("/login");
            },
        });
    }

    const handleLogoutClick = () => {
        showModel(logout, {
            title: "Confirm Logout",
            description: "You are about to sign out of your account. You will need to re-authenticate to access the admin dashboard again.",
            actionText: "Logout"
        })
    }

    
    return (
       <div className='flex gap-2 items-center min-w-50'>
            <Avatar className="h-10 w-10 rounded-full border">
                <AvatarImage src={imageUrl || "/logo.png"} alt="Coremart Logo" />
            </Avatar>
            <Dropdown
                trigger={(
                    <div className='flex gap-1 items-center cursor-pointer'>
                        <Typography>{name}</Typography>
                        <Icon name="ChevronDown" width={16} height={16} stroke='currentColor' />
                    </div>
                )}
                items={[
                    {
                        label: "Profile",
                        icon: "User",
                        onClick: () => router.push("/profile"),
                    },
                    {
                        label: "Theme",
                        icon: "SunMoon",
                        onClick: () => handleDarkModeToggle(),
                        isSeparator: true
                    },
                    {
                        label: "Logout",
                        icon: "LogOut",
                        onClick: handleLogoutClick,
                    },
                ]}
            />
       </div>
    )
}

export default AdminDropdown
