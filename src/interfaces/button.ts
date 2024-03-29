import { MouseEvent } from "react";

export interface IButton {
    label: string,
    icon?: string,
    width?: number,
    height?: number,
    marginTop?: number,
    color?: string,
    bg?: string,
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}