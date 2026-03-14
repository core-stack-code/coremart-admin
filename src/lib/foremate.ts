import { format } from "date-fns";

export const formatDate = (time: string | Date, isTime = false) => {
    const date = typeof time === "string" ? new Date(time) : time;
    
    if (isNaN(date.getTime())) return "";

    if (!isTime) {
        return format(date, 'dd MMM yyyy');
    }
    return format(date, 'dd MMM yyyy, hh:mm aa');
}


// display in ruppues
export const formatCurrency = (amount: number): string => {
    const rupees = amount / 100;

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(rupees);
}