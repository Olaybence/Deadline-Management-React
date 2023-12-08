import Moment from "moment";

export class OwnDate {
  static dayStartHour = 9;
  static dayEndHour = 17;
  static workhours = 8;
  static dateFormat = "YYYY-MM-DD HH:mm";
  static dateFormatter = (date: Date) =>
    Moment(date).format(OwnDate.dateFormat);

  /**
   * convert the default getDay(): Su-0 M-1 Tu-2 We-3 Th-4 Fr-5 Sa-6
   * into OwnDate.getDay(): M-1 Tu-2 We-3 Th-4 Fr-5 Sa-6 Su-7
   * @param {Date} date
   * @returns
   */
  static getDay(date: Date) {
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
  static addDays(date: Date, days: number): Date {
    const newDate = OwnDate.getDayAtHour(date,OwnDate.dayStartHour);
    return new Date(newDate.setDate(newDate.getDate() + days));
  }

  // function skipWeekends(date) {
  // 	const day = OwnDate.getDay(date);
  // 	if(day > 5) return addDays(date, 7 - day);
  // }

  /**
   * TODO: TEST THIS
   * @returns {number} Return what is today's remaining workhours
   */
  static getTodaysRemaining(): number {
    if (new Date().getHours() < OwnDate.dayStartHour) {
      return 8;
    } else if (new Date().getHours() > OwnDate.dayEndHour) {
      // GIVE A DAY TO THE STARTDATE
      return 8;
    } else {
      return OwnDate.dayEndHour - new Date().getHours();
    }
  }

  static getNextWorkday(time: Date): Date {
    if(time.getHours() > OwnDate.dayEndHour) {
      time = OwnDate.addDays(OwnDate.getDayAtHour(time,OwnDate.dayStartHour),1);
    }
    switch (OwnDate.dayIndex(time)) {
      case 6:
        return OwnDate.addDays(time, 2);
      case 7:
        return OwnDate.addDays(time, 1);
      default:
        return time;
    }
  }

  /**
   * Set the time to hour
   * Move to the next day
   * @return {Date} next day at hour o'clock
   *  */ 
  static getDayAtHour(date: Date, hour: number) {
    date.setHours(hour, 0, 0, 0);
    return date;
  }

  /**
   * convert the default getDay(): Su-0 M-1 Tu-2 We-3 Th-4 Fr-5 Sa-6
   * into OwnDate.getDay(): M-1 Tu-2 We-3 Th-4 Fr-5 Sa-6 Su-7
   * @param {Date} date
   * @returns
   */
  static dayIndex(date: Date) {
    const day = new Date(date).getDay();
    return day !== 0 ? day : 7;
  }

  /**
   *
   * Cases:
   * weeksPassed = Math.floor(daysBetween / 7);
   *
   * endDay > startDay && endDay < 6			==> endDay - startDay - 2*weeksPassed + (remaining !== 0 ? 1 : 0)
   * Example (in a week, Tuesday - Thursday = 3): 4>2 && 4<6 ==> 4-2-2*0  +1 = 3
   *
   * endDay > startDay && endDay >= 6		==> endDay - startDay - 2*weeksPassed - (endDay-5) + (remaining !== 0 ? 1 : 0)
   * Example (in a week, Tuesday - Sunday = 4): 7>2 && 7>6 ==> 7-2-2*0 - (7-5) +1 = 4
   *
   * startDay > endDay && startDay < 6 	===> 5 - (startDay - endDay)
   * Example (in a week, Thursday - Tuesday = 4): 4>2 && 4<6 ==> 7-2-2*0 - (7-5) +1 = 4
   *
   *
   * startDay > endDay && startDay >= 6 	===>
   *
   * Returns the number of days between 2 Date
   *
   * TODO: TEST THIS
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {Number} number of WORKdays between (if startDate has remaining, count that as well)
   */
  // static countWorkdaysBetween(startDate: Date, endDate: Date) {
  //   const millisecondsPerDay = 24 * 60 * 60 * 1000;
  //   const daysBetween = Math.abs(
  //     Math.floor((Number(endDate) - Number(startDate)) / millisecondsPerDay)
  //   );
  //   const weeksPassed = Math.floor(daysBetween / 7);
  //   const startDay = OwnDate.getDay(startDate); // 0-7
  //   const endDay = OwnDate.getDay(endDate); // 0-7
  //   const remaining = daysBetween - weeksPassed * 7;

  //   if (endDay > startDay && endDay < 6) {
  //     return endDay - startDay - 2 * weeksPassed + (remaining !== 0 ? 1 : 0);
  //   } else if (endDay > startDay && endDay >= 6) {
  //     return (
  //       endDay -
  //       startDay -
  //       2 * weeksPassed -
  //       (endDay - 5) +
  //       (remaining !== 0 ? 1 : 0)
  //     );
  //   }
  // }
}
