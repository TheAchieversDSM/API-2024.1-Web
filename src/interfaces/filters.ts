import { DateRange } from "rsuite/esm/DateRangePicker";

export interface Filters {
    dateRange: DateRange | undefined;
    categories: { id: string, name: string }[] | { id: string, name: string };
    selectedOptions: { id: string, name: string, catId: number }[];
    estado: { id: string}[] | { id: string};
}