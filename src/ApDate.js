export default class ApDate {

    static standard(d) {
        return `${d.getFullYear()}-${ApDate.numbers(d.getMonth()+1)}-${ApDate.numbers(d.getDate())}`;
    }

    static numbers(n) {
        return n<10 ? `0${n}` : n;
    }

    static isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}