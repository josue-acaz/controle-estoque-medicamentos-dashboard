import {format, addDays} from "date-fns";
import {ptBR} from "date-fns/locale";

export function stringDateToSql(date: string) {
    const formatted_date = `${date.split("/").reverse().join("-")}T00:00:00`;
    return formatted_date;
}

export function formatDatetime(date: string | Date, date_format_type: string) {
    if(date === "") return date;
    
    date = new Date(date);
    const formatted = format(date, date_format_type, {locale: ptBR});
    return formatted;
}