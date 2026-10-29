// Working days as civil-service counts them (its WorkingDayIndicator): every day except Saturdays, Sundays and the
// England and Wales bank holidays on GOV.UK's list, which civil-service reads too
const bankHolidaysUrl = 'https://www.gov.uk/bank-holidays.json';

let bankHolidays: Promise<Set<string>> | undefined;

// The England and Wales bank holidays as YYYY-MM-DD dates, fetched once per run. If GOV.UK cannot be reached only
// weekends are skipped, and a date that falls on a bank holiday is rejected by civil-service with "Date must be next
// working weekday".
function englandAndWalesBankHolidays(): Promise<Set<string>> {
  bankHolidays ??= fetch(bankHolidaysUrl, { signal: AbortSignal.timeout(10000) })
    .then((response) => response.json())
    .then((holidays) => new Set<string>(holidays['england-and-wales'].events.map((event: { date: string }) => event.date)))
    .catch((error) => {
      console.warn(`Could not read the bank holidays from ${bankHolidaysUrl}, so only weekends are skipped: ${error}`);
      return new Set<string>();
    });
  return bankHolidays;
}

const isWorkingDay = (day: Date, holidays: Set<string>) =>
  ![0, 6].includes(day.getUTCDay()) && !holidays.has(day.toISOString().slice(0, 10));

// Today's date (YYYY-MM-DD) where the tests run
function today(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

// The date (YYYY-MM-DD) the given number of days after a date, moved on to the next working day if it is not one
export async function workingDayAfter(date: string, days: number): Promise<string> {
  const holidays = await englandAndWalesBankHolidays();
  const day = new Date(`${date.slice(0, 10)}T12:00:00Z`);
  day.setUTCDate(day.getUTCDate() + days);
  while (!isWorkingDay(day, holidays)) {
    day.setUTCDate(day.getUTCDate() + 1);
  }
  return day.toISOString().slice(0, 10);
}

// The date (YYYY-MM-DD) the given number of working days after a date (today by default), counted as civil-service
// counts them (DeadlinesCalculator.plusWorkingDays): a day at a time, each moved on to the next working day. Always a
// working day, for dates civil-service checks are one, such as when a claim is deemed served.
export async function workingDaysAfter(workingDays: number, date: string = today()): Promise<string> {
  const holidays = await englandAndWalesBankHolidays();
  const day = new Date(`${date.slice(0, 10)}T12:00:00Z`);
  for (let count = 0; count < workingDays; count++) {
    day.setUTCDate(day.getUTCDate() + 1);
    while (!isWorkingDay(day, holidays)) {
      day.setUTCDate(day.getUTCDate() + 1);
    }
  }
  return day.toISOString().slice(0, 10);
}
