import { Schedule, Task } from "../assets/models";
import { addDays, getOwnDay, getTodaysRemaining, workhours } from "../assets/util";

// TODO: TEST THIS
/**
 * Order the tasks by deadline
 * Compare them one-by-one and place them in the right place
 * This implements the quicksort algorithm with O(N*logN) time and n space
 */
export function orderTasksByDeadline(tasks : Task[]) {
  if(tasks.length === 0) return [];

  let orderedTasks: Task[] = [tasks[0]];
  tasks.slice(1).forEach((task) => {
    let placed = false;
    let i = 0;
    while (!placed && i < orderedTasks.length) {
      const compTask: Task = orderedTasks[i];
      if (task.deadline < new Date()) {
        // Already overdue
        // TODO: COOP WITH OVERDUE AS THEY SAID
        // console.warning("OVERDUE:", task);
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

  // console.log("orderedTasks", orderedTas2ks);
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
export function calculateSchedule(tasks: Task[]) {
  // console.log("BENCE calculateItem - calculateSchedule");
  return calculateScheduleLazy(tasks);
}

/**
 * @param {Task[]} tasks
 * @returns {Schedule[]} optimalized ordered schedule array
 */
function calculateScheduleLazy(tasks: Task[]) {
  let schedule: Schedule[] = [];
  let progressDay = new Date().getHours() > 17 ? addDays(new Date(),1) : new Date();
  let remainingTime = getTodaysRemaining();
  // console.log("calculateScheduleLazy", tasks);
  tasks.forEach((task: Task) => {

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
      // console.log("calculateItem - nextSchedule", nextSchedule);
      schedule.push(nextSchedule);

      // Update info for next task
      remainingTime = nextSchedule.remainingTime;
      if (remainingTime > 0) progressDay = nextSchedule.endDate;
      else progressDay = addDays(nextSchedule.endDate, 1);
      // console.log("remainingTime", remainingTime);
      // console.log("progressDay", progressDay);
    }
  });
  // console.log("calculateScheduleLazy", schedule);
  return schedule;
}



/**
 * TODO: TEST THIS:
 * - nothing is undefined
 * - Sum(timeSpent) = turnaroundTime
 *
 * @param {Task} task
 * @param {number} remainingTime
 * @param {Date} progressDay
 * @returns {Schedule}
 */
function calculateItem(task: Task, remainingTime: number, progressDay: Date): Schedule {
  // console.log("calculateItem task, remainingTime, progressDay", task, remainingTime, progressDay);
  // Time needed each day
  let timeSpent = calculateTimeArray(progressDay,task.turnaroundTime,remainingTime);

  const res = {
    taskId: task.id,
    taskName: task.name,
    taskPriority: task.priority,
    turnaroundTime: task.turnaroundTime,
    startDate: progressDay,
    endDate: addDays(progressDay, timeSpent.length - 1),
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
function evaluatePriority(schedule: Schedule[], task: Task) {
  return schedule;
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
 * @param {number} turnaroundTime 
 * @param {number} remainingStartdayTime 
 * @returns {number[]}
 */
function calculateTimeArray(startDate: Date, turnaroundTime: number, remainingStartdayTime: number) {
  
  // Single-day task
  if (turnaroundTime <= remainingStartdayTime) return [turnaroundTime];

  // Multi-day task (at least 2 days)
  let timeArray = [];
  if(remainingStartdayTime !== 0) timeArray.push(remainingStartdayTime);
  
  let remainingTime = turnaroundTime - remainingStartdayTime;

  const furtherDaysNeeded = Math.floor(remainingTime / workhours);
  const lastDayWorkHours = remainingTime % workhours;
  const startDay = getOwnDay(startDate);

  // If can be finished in the current week
  if (startDay + furtherDaysNeeded + (lastDayWorkHours > 0 ? 1 : 0) <= 5) {
    if (furtherDaysNeeded > 0)
      timeArray = timeArray.concat(Array(furtherDaysNeeded).fill(workhours));
    if (lastDayWorkHours > 0) timeArray.push(lastDayWorkHours);
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
    // Add weekend
    timeArray = timeArray.concat([0, 0]);

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
    }
    timeArray = timeArray.concat(remainingTime.slice(i, remainingTime.length));
    // console.log("timeArray",timeArray);
    return timeArray;
  }
}