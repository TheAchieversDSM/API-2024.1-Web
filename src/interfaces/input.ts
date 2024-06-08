import { ChangeEventHandler } from "react"

export interface IInput {
    value: string
    placeholder: string
    width?: number
    height?: number
    marginTop?: number
    fontSize?: number
    name?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}