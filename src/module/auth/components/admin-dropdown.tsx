import React from 'react'
import { useRouter } from 'next/navigation'

import Dropdown from '@composite/dropdown'
import Icon from '@/components/icons'
import { Avatar, AvatarImage } from '@ui/avatar'
import { Typography } from '@ui/typography'
import { useLogout } from '../api/mutation'

interface AdminDropdownProps {
    name: string
    imageUrl: string | null
}


const AdminDropdown: React.FC<AdminDropdownProps> = ({ name, imageUrl }) => {
    const router = useRouter()
    const { mutate } = useLogout()

    const handleDarkModeToggle = () => {
        console.log("Dark mode toggled");
    }

    const handleLogout = () => {
        mutate(undefined, {
            onSuccess: () => {
                router.push("/login");
            },
        });
    }

    
    return (
       <div className='flex gap-2 items-center min-w-50'>
            <Avatar className="h-10 w-10 rounded-full border">
                <AvatarImage src={imageUrl || "/logo.png"} alt="Coremart Logo" />
            </Avatar>
            <Dropdown
                trigger={(
                    <div className='flex gap-1 items-center '>
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
                        onClick: handleLogout,
                    },
                ]}
            />
       </div>
    )
}

export default AdminDropdown
