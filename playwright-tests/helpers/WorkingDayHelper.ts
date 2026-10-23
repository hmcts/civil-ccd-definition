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

// The date (YYYY-MM-DD) the given number of days after a date, moved on to the next working day if it is not one
export async function workingDayAfter(date: string, days: number): Promise<string> {
  const holidays = await englandAndWalesBankHolidays();
  const day = new Date(`${date.slice(0, 10)}T12:00:00Z`);
  day.setUTCDate(day.getUTCDate() + days);
  while ([0, 6].includes(day.getUTCDay()) || holidays.has(day.toISOString().slice(0, 10))) {
    day.setUTCDate(day.getUTCDate() + 1);
  }
  return day.toISOString().slice(0, 10);
}
