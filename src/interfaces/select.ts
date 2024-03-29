import { MultiSelectChangeEvent } from "primereact/multiselect";

export interface ISelect {
    value: { id: string, name: string }[],
    options: { id: string, name: string }[],
    name: string,
    width?: number,
    multiple: boolean,
    placeholder: string,
    maxSelected?: number,
    onChange: (e: MultiSelectChangeEvent) => void,
}