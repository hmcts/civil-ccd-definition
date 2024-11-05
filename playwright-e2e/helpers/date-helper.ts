import { bankHolidays } from '../config/data';

export default class DateHelper {
  private static addDate(date: Date, { days = 0, months = 0, years = 0, workingDay = false }) {
    date.setDate(date.getDate() + days);
    date.setMonth(date.getMonth() + months);
    date.setFullYear(date.getFullYear() + years);
    if (workingDay) {
      date = this.getNextWorkingDay(date);
    }
    return date;
  }

  static addToToday({ days = 0, months = 0, years = 0, workingDay = false }): Date {
    return this.addDate(new Date(), { days, months, years, workingDay });
  }

  static addToDate(date: string, { days = 0, months = 0, years = 0, workingDay = false }): Date {
    return this.addDate(new Date(date), { days, months, years, workingDay });
  }

  private static subtractDate(
    date: Date,
    { days = 0, months = 0, years = 0, workingDay = false },
  ): Date {
    date.setDate(date.getDate() - days);
    date.setMonth(date.getMonth() - months);
    date.setFullYear(date.getFullYear() - years);

    if (workingDay) {
      date = this.getNextWorkingDay(date);
    }
    return date;
  }

  static subtractFromToday({ days = 0, months = 0, years = 0, workingDay = false }): Date {
    return this.subtractDate(new Date(), { days, months, years, workingDay });
  }

  static subtractFromDate(
    date: string,
    { days = 0, months = 0, years = 0, workingDay = false },
  ): Date {
    return this.subtractDate(new Date(date), { days, months, years, workingDay });
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

  private static isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
  }

  private static isNonWorkingDay(date: Date): boolean {
    // Check if the date is a weekend
    if (this.isWeekend(date)) return true;

    // Check if the date is a holiday from the list of holidays
    return bankHolidays.some((bankHoliday) => {
      const bankHolidayDate = new Date(bankHoliday);
      return bankHolidayDate.toDateString() === date.toDateString();
    });
  }

  private static getNextWorkingDay(date: Date): Date {
    const nextDate = new Date(date);

    // Increment day by 1 until we find a working day
    console.log(`${nextDate.toDateString()}: ${this.isNonWorkingDay(nextDate)}`);
    while (this.isNonWorkingDay(nextDate)) {
      nextDate.setDate(nextDate.getDate() + 1);
    }

    return nextDate;
  }
}
