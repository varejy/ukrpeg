import format from 'date-fns/format';
import getMonth from 'date-fns/get_month';
const MONTHS = ['Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'];

export default function getDateFormatted (date, lang) {
    const dateFormattedEn = format(date, 'DD MMMM YYYY');
    if (lang === 'ua') {
        const month = getMonth(date);
        const uaMonth = MONTHS[month];
        let dateFormattedUa = dateFormattedEn.split(' ');
        dateFormattedUa.splice(1, 1, uaMonth);
        dateFormattedUa.join(' ');
        return dateFormattedUa;
    } else {
        return dateFormattedEn;
    }
}
