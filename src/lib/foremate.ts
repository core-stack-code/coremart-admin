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