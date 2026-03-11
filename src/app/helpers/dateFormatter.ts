export const formatDateToMonthDayYear = (date: string) => {
    // F d, Y => March, 7 2023
    const fullDate = createDateFromString(date);

    return `${fullDate.toLocaleString('default', {month: 'long'})} ${fullDate.getDate()}, ${fullDate.getFullYear()}`;
}

export const createDateFromString = (date: string) => {
    // for the month we do -1 because new Date accepts month Index and not month
    return new Date(parseInt(date.split('-')[0]), parseInt(date.split('-')[1]) - 1, parseInt(date.split('-')[2]));
}

export const formatDateToDateTime = (dateString: string) => {
    const date = new Date(dateString);

    // Define options for formatting
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export const convertToGST = (input: string): string => {
    const date = new Date(input); // Treat as UTC
    // const date = new Date(input + " UTC"); // Treat as UTC

    const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dubai", // GST
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
};
