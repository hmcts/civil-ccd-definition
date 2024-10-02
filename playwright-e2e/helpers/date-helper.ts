export default class DateHelper {
  static addToToday({ days = 0, months = 0, years = 0 }): Date {
    const today = new Date();
    today.setDate(today.getDate() + days);
    today.setMonth(today.getMonth() + months);
    today.setFullYear(today.getFullYear() + years);

    return today;
  }

  static subtractFromToday({ days = 0, months = 0, years = 0 }): Date {
    const today = new Date();
    today.setDate(today.getDate() - days);
    today.setMonth(today.getMonth() - months);
    today.setFullYear(today.getFullYear() - years);

    return today;
  }

  static getTwoDigitDay(date: Date): string {
    const day = date.getDate();
    return day < 10 ? `0${day}` : `${day}`;
  }

  static getTwoDigitMonth(date: Date): string {
    const month = date.getMonth() + 1;
    return month < 10 ? `0${month}` : `${month}`;
  }

  static getTwoDigitYear(date: Date): string {
    const year = date.getFullYear();
    return `${year % 100}`.padStart(2, '0');
  }

  static formatDate(inputDate: string, inputFormat = 'YYYY-MM-DD', outputFormat = 'DD Mon YYYY') {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const [year, month, day] = inputDate.split('-');

    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    return formattedDate;
  }
}
