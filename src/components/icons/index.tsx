import { LUCIDE_ICON_MAP, CUSTOM_ICON_MAP } from "./utils";

type LucideIconName = keyof typeof LUCIDE_ICON_MAP;
type CustomIconName = keyof typeof CUSTOM_ICON_MAP;

export type IconName = LucideIconName | CustomIconName;

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
}

const Icon = ({ name, ...props }: IconProps) => {
    const LucideComponent = LUCIDE_ICON_MAP[name as LucideIconName];
    const CustomComponent = CUSTOM_ICON_MAP[name as CustomIconName];

    if (LucideComponent) return <LucideComponent {...props} />
    if (CustomComponent) return <CustomComponent {...props} />
    
    return null;
}

export default Icon;