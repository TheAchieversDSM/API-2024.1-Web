import { DateRange } from "rsuite/esm/DateRangePicker";
import { MouseEvent, SyntheticEvent } from "react";
import { RangeType } from "rsuite/esm/DatePicker";

export interface IDatepicker {
    placeholder: string,
    value?: DateRange,
    onShortcut?: (range: RangeType<DateRange>, event: any) => void;
    onClean?: (event: any) => void;
    onOk: (date: DateRange, event: SyntheticEvent<Element, Event>) => void;
}