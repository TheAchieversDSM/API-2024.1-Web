import { DateRange } from "rsuite/esm/DateRangePicker";
import { SyntheticEvent } from "react";

export interface IDatepicker {
    placeholder: string,
    value?: any,
    onOk: (date: DateRange, event: SyntheticEvent<Element, Event>) => void
}