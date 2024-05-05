import { ChangeEventHandler } from "react"

export interface IInput {
    value: string
    placeholder: string
    width?: number,
    height?: number,
    marginTop?: number,
    fontSize?: number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}