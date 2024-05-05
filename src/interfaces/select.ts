import { MultiSelectChangeEvent, MultiSelectFilterEvent } from "primereact/multiselect";

export interface ISelect {
    value: { id: string, name: string }[] | { id: string, name: string },
    options: { id: string, name: string }[],
    name: string,
    width?: number,
    placeholder: string,
    maxSelected?: number,
    onFilter?: ((e: MultiSelectFilterEvent) => void) | undefined,
    onChange: (e: MultiSelectChangeEvent) => void,
}