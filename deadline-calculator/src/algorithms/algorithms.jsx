import Moment from "moment";

export const workhours = 8;
export const dateFormat = "YYYY-MM-DD";

// TODO: Idea - Create an object for date manipulations

// TODO: TEST THIS
/**
 * Order the tasks by deadline
 * Compare them one-by-one and place them in the right place
 * This implements the quicksort algorithm with O(N*logN) time and n space
 */
export function orderTasksByDeadline(tasks) {
  console.log("orderTasksByDeadline tasks",tasks)
  let orderedTasks = [tasks.at(0)];
  tasks.slice(1).forEach((task) => {
    let placed = false;
    let i = 0;
    while (!placed && i < orderedTasks.length) {
      const compTask = orderedTasks[i];
      if (task.deadline < Date.now()) {
        // Already overdue
        // TODO: COOP WITH OVERDUE AS THEY SAID
        console.warning("OVERDUE:", task);
        placed = true;
      } else if (task.deadline < compTask.deadline) {
        orderedTasks = orderedTasks
          .slice(0, i)
          .concat([task], orderedTasks.slice(i));
        placed = true;
      }
      i++;
    }
    if (!placed) {
      orderedTasks.push(task);
    }

  });

  console.log("orderedTasks", orderedTasks);
  return orderedTasks;
}

/**
 * It calculates the order by simply order them by deadline,
 * and from now on continously work one-by-one.
 *
 * TODO: TEST THIS: Generic testing
 * - items last hour + next first = 8
 * - dates are not on weekends (getDay() < 6)
 *
 * @returns Returns an ordered list in which we need to solve the given tasks.
 */
export function calculateSchedule(tasks) {
  console.log("BENCE calculateItem - calculateSchedule");
  return calculateScheduleLazy(tasks);
}

/**
 * Schedule: {
 *        taskId: Number,
 *        turnaroundTime: Number,
 *        startDate: String "YYYY-MM-DD",
 *        endDate: String "YYYY-MM-DD",
 *        remainingTime: Number, The time left AFTER the given task
 *        timeSpent: Number[], The time spent each day with the given task
 *        deadline: Date "YYYY-MM-DD",
 *    }
 * @param {Task[]} tasks
 * @returns {Schedule[]} optimalized ordered schedule array
 */
function calculateScheduleLazy(tasks) {
  let schedule = [];
  let progressDay = new Date().getHours() > 17 ? addDays(Date.now(),1) : Date.now();
  let remainingTime = getTodaysRemaining();
  console.log("calculateScheduleLazy", tasks);
  tasks.forEach((task) => {

    // Calculate the hours needed per days
    const timeArray = calculateTimeArray(
      progressDay,
      task.turnaroundTime,
      remainingTime
    );

    if (remainingTime + timeArray.length * workhours < task.turnaroundTime) {
      // NOW: Ignore if not possible in line
      // TODO: Use priority
      console.log("WARNING: Task ignored with ID:", task.id);
      schedule = evaluatePriority(schedule, task);
    } else {
      // If possible (no conflict), add to task to the schedule and calculate its data
      const nextSchedule = calculateItem(task, remainingTime, progressDay);
      console.log("calculateItem - nextSchedule", nextSchedule);
      schedule.push(nextSchedule);

      // Update info for next task
      remainingTime = nextSchedule.remainingTime;
      if (remainingTime > 0) progressDay = nextSchedule.endDate;
      else progressDay = addDays(nextSchedule.endDate, 1);
      console.log("remainingTime", remainingTime);
      console.log("progressDay", progressDay);
    }
  });
  console.log("calculateScheduleLazy", schedule);
  return schedule;
}

/**
 * TODO: TEST THIS:
 * - nothing is undefined
 * - Sum(timeSpent) = turnaroundTime
 *
 * @param {Task} task
 * @param {Number} remainingTime
 * @param {Date} progressDay
 * @returns {Schedule}
 */
function calculateItem(task, remainingTime, progressDay) {
  console.log("calculateItem task, remainingTime, progressDay", task, remainingTime, progressDay);
  // Time needed each day
  let timeSpent = calculateTimeArray(progressDay,task.turnaroundTime,remainingTime);
  
  const res = {
    taskId: task.id,
    taskName: task.name,
    turnaroundTime: task.turnaroundTime,
    startDate: Moment(progressDay).format(dateFormat),
    endDate: Moment(addDays(progressDay, timeSpent.length - 1)).format(
      dateFormat
    ),
    remainingTime: timeSpent.length > 1 ? workhours - timeSpent[timeSpent.length-1] : remainingTime - timeSpent[timeSpent.length-1],
    timeSpent: timeSpent,
    deadline: task.deadline,
  };
  return res;
}

/**
 * If there is a conflict, we need to check whether the privious or the two before
 * (as much task as needed to give the current task enough time to solve)
 * the given task has higher priority.
 * TODO: TEST THIS
 * @param {Schedule[]} schedule - the planned tasks
 * @param {Task} task - current task
 * @returns {Schedule[]} - new schedule resolving this conflict
 */
function evaluatePriority(schedule, task) {
  return schedule;
}

// function skipWeekends(date) {
// 	const day = getOwnDay(date);
// 	if(day > 5) return addDays(date, 7 - day);
// }

/**
 * TODO: TEST THIS
 * @returns Return what is today's remaining workhours
 */
function getTodaysRemaining() {
  if (new Date().getHours() < 9) {
    return 8;
  } else if (new Date().getHours() > 17) {
    // GIVE A DAY TO THE STARTDATE
    return 8;
  } else {
    return 17 - new Date().getHours();
  }
}

/**
 * ATTENTION:
 * getDay() -> Su-0 M-1 Tu-2 We-3 Th-4 Fr-5 Sa-6
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
// function countWorkdaysBetween(startDate, endDate) {
//   const millisecondsPerDay = 24 * 60 * 60 * 1000;
//   const daysBetween = Math.abs(
//     Math.floor((endDate - startDate) / millisecondsPerDay)
//   );
//   const weeksPassed = Math.floor(daysBetween / 7);
//   const startDay = getOwnDay(startDate); // 0-7
//   const endDay = getOwnDay(endDate); // 0-7
//   const remaining = daysBetween - weeksPassed*7;

//   if(endDay > startDay && endDay < 6) {
//     return  endDay - startDay - 2*weeksPassed + (remaining !== 0 ? 1 : 0);
//   } else if(endDay > startDay && endDay >= 6) {
//     return endDay - startDay - 2*weeksPassed - (endDay-5) + (remaining !== 0 ? 1 : 0)
//   }
// }

/**
 * 
 * @param {Date} startDate 
 * @param {Number} turnaroundTime 
 * @param {Number[]} remainingStartdayTime 
 * @returns {Number[]}
 */
function calculateTimeArray(startDate, turnaroundTime, remainingStartdayTime) {
  console.log("calculateTimeArray -------------- timeArray", turnaroundTime <= remainingStartdayTime, startDate, turnaroundTime, remainingStartdayTime);
  // Single-day task
  if (turnaroundTime <= remainingStartdayTime) return [turnaroundTime];

  // Multi-day task (at least 2 days)
  let timeArray = [];
  if(remainingStartdayTime !== 0) timeArray.push(remainingStartdayTime);
  console.log("timeArray1",timeArray);
  
  let remainingTime = turnaroundTime - remainingStartdayTime;

  const furtherDaysNeeded = Math.floor(remainingTime / workhours);
  const lastDayWorkHours = remainingTime % workhours;
  const startDay = getOwnDay(startDate);

  // If can be finished in the current week
  console.log("timeArray overweek",startDay + furtherDaysNeeded + (lastDayWorkHours > 0 ? 1 : 0) <= 5);
  console.log("timeArray startDay , furtherDaysNeeded , (lastDayWorkHours > 0 ? 1 : 0)",startDay , furtherDaysNeeded , (lastDayWorkHours > 0 ? 1 : 0));
  if (startDay + furtherDaysNeeded + (lastDayWorkHours > 0 ? 1 : 0) <= 5) {
    if (furtherDaysNeeded > 0)
      timeArray = timeArray.concat(Array(furtherDaysNeeded).fill(workhours));
      console.log("timeArray2",timeArray);
    if (lastDayWorkHours > 0) timeArray.push(lastDayWorkHours);
    console.log("timeArray3",timeArray);
    return timeArray;
    // Goes over weeks
  } else {
    const furtherTimes = Array(furtherDaysNeeded)
      .fill(workhours)
      .concat(lastDayWorkHours > 0 ? [lastDayWorkHours] : []);
    const daysLeftOnTheWeek = 5 - startDay;

    // Take the time of this week
    let thisWeek = furtherTimes.slice(0, daysLeftOnTheWeek);
    if (daysLeftOnTheWeek > 0) timeArray = timeArray.concat(thisWeek);
    console.log("timeArray4",timeArray);
    // Add weekend
    timeArray = timeArray.concat([0, 0]);
    console.log("timeArray5",timeArray);

    const remainingTime = furtherTimes.slice(
      daysLeftOnTheWeek,
      furtherTimes.length
    );
    let i = 0;
    while (remainingTime.length - i > 5) {
      timeArray = timeArray
        .concat(remainingTime.slice(i, i + 5))
        .concat([0, 0]);
      i += 5;
      console.log("timeArray6",timeArray);
    }
    timeArray = timeArray.concat(remainingTime.slice(i, remainingTime.length));
    console.log("timeArray7",timeArray);
    return timeArray;
  }
}

/**
 * convert the default getDay(): Su-0 M-1 Tu-2 We-3 Th-4 Fr-5 Sa-6
 * into getOwnDay(): M-1 Tu-2 We-3 Th-4 Fr-5 Sa-6 Su-7
 * @param {Date} date
 * @returns
 */
function getOwnDay(date) {
  const day = new Date(date).getDay();
  return day !== 0 ? day : 7;
}

/**
 * Add number of days to a given date.
 *
 * TODO: TEST THIS
 * @param {Date} date
 * @param {Date} days
 * @returns {Date} date + days
 */
function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return Moment(result).format(dateFormat);
}
