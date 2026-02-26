import React from 'react'
import Icon, { IconName } from '../icons'
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@ui/dropdown-menu'
import { Typography } from '@ui/typography'

interface DropdownProps {
    trigger: React.ReactNode
    items: Array<{
        label: string
        onClick: () => void
        icon?: IconName
        isSeparator?: boolean
    }>
}


const Dropdown: React.FC<DropdownProps> = ({ trigger, items }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    {items.map((item, index) => (
                        <React.Fragment key={`${item.label}-${index}`}>
                            <DropdownMenuItem onSelect={item.onClick} className='cursor-pointer'>
                                {item.icon && <Icon name={item.icon} width={16} height={16} className="mr-2 inline-block" />}
                                <Typography variant="small" className='font-normal text-foreground mt-0.5'>{item.label}</Typography>
                            </DropdownMenuItem>
                            {item.isSeparator && <DropdownMenuSeparator className='my-1' />}
                        </React.Fragment>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Dropdown
