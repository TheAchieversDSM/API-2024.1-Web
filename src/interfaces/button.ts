import { MouseEvent } from "react";

export interface IButton {
    label: string
    icon?: string
    disabled?: boolean
    width?: number
    height?: number
    marginTop?: number
    color?: string
    bg?: string
    name?: string
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}