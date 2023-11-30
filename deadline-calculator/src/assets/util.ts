import Moment from "moment";

export const workhours = 8;
export const dateFormat = "YYYY-MM-DD";
export const dateFormatter = (date: Date) => Moment(date).format(dateFormat);

export type Task = {
  id: number; // Unique identifier
  name: string;
  priority: number;
  deadline: Date; // Deadline day
  turnaroundTime: number; // Time in hours
};

export type Schedule = {
  taskId: number;
  taskName: string;
  taskPriority: number;
  turnaroundTime: number;
  startDate: Date; // "YYYY-MM-DD"
  endDate: Date; // "YYYY-MM-DD"
  remainingTime: number; // The time left AFTER the given task
  timeSpent: number[]; // The time spent each day with the given task
  deadline: Date; // "YYYY-MM-DD"
};

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
