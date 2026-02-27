import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const formatDate = (time: string, isTime = false) => {
    const date = dayjs.utc(time);
    if (!isTime) {
        return date.format('DD MMM YYYY');
    }
    return date.format('DD MMM YYYY, hh:mm A');
}


export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
    }).format(amount);
}