import { SizeType } from "@mod/attributes/api/type";

type OPTIONS_TYPE = {
    label: string;
    value: string;
}

export const SIZE_TYPES: SizeType[] = ["ALPHA", "FREE", "NUMERIC"] as const;
export const SIZE_TYPES_OPTIONS: OPTIONS_TYPE[] = [
    { label: "Alpha", value: "ALPHA" },
    { label: "Free", value: "FREE" },
    { label: "Numeric", value: "NUMERIC" }
]