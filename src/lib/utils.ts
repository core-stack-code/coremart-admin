import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Log = (text: string, data: any): void => {
  const style = `
    font-size: 16px;
    padding: 4px;
    background-color: blue;
    color: white;
    font-weight: bold;
  `

  console.log(`%c${text}`, style, data)
}