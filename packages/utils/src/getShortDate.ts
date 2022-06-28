export const getShortDate = (date: string | Date) => {
    const dateString = new Date(date).toLocaleDateString().split('/').join('-');
    if (dateString === 'Invalid Date') return '';
    return dateString;
};
