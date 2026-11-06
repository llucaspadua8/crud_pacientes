import { parseISO, isValid, format } from "date-fns";

export function formatData(dataISO:string):string{
    const data = parseISO(dataISO)
    if (!isValid(data))return ''

    return format(data, 'dd/MM/yyyy')
}