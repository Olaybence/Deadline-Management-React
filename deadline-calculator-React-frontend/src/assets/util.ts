import Moment from "moment";

export const workhours = 8;
export const dateFormat = "YYYY-MM-DD";
export const dateFormatter = (date: Date) => Moment(date).format(dateFormat);

/**
 * convert the default getDay(): Su-0 M-1 Tu-2 We-3 Th-4 Fr-5 Sa-6
 * into getOwnDay(): M-1 Tu-2 We-3 Th-4 Fr-5 Sa-6 Su-7
 * @param {Date} date
 * @returns
 */
export function getOwnDay(date: Date) {
  const day = new Date(date).getDay();
  return day !== 0 ? day : 7;
}

/**
 * Add number of days to a given date.
 *
 * TODO: TEST THIS
 * @param {Date} date
 * @param {Date} days
 * @returns {string} date + days // Formatted: YYYY-MM-DD
 */
export function addDays(date: Date, days: number): Date {
  return new Date(date.setDate(date.getDate() + days));
}

// function skipWeekends(date) {
// 	const day = getOwnDay(date);
// 	if(day > 5) return addDays(date, 7 - day);
// }

/**
 * TODO: TEST THIS
 * @returns {number} Return what is today's remaining workhours
 */
export function getTodaysRemaining(): number {
  if (new Date().getHours() < 9) {
    return 8;
  } else if (new Date().getHours() > 17) {
    // GIVE A DAY TO THE STARTDATE
    return 8;
  } else {
    return 17 - new Date().getHours();
  }
}