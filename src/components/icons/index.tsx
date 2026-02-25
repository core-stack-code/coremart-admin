import { LUCIDE_ICON_MAP } from "./utils";

type LucideIconName = keyof typeof LUCIDE_ICON_MAP;
export type IconName = LucideIconName;

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
}

const Icon = ({ name, ...props }: IconProps) => {
    const LucideComponent = LUCIDE_ICON_MAP[name as LucideIconName];

    if (LucideComponent) return <LucideComponent {...props} />
    
    return null;
}

export default Icon;