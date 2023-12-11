import { Schedule, Task } from "../assets/models";
import { OwnDate } from "../assets/util";

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
  let progressTime = OwnDate.getNextWorkday(new Date());
  let remainingTime = OwnDate.getTodaysRemaining();
  
  console.log("Start time", progressTime);
  console.log("Today's remaining time:", remainingTime);
  tasks.forEach((task: Task, i: number) => {
    console.log("---------------------------------------");
    console.log("Task " + i + ":", task);
    // Calculate the hours needed per days
    const timeArray = calculateTimeArray(
      progressTime,
      task.turnaroundTime,
      remainingTime
    );
    console.log("timeArray", timeArray);

    // if (
    //   remainingTime + timeArray.length * OwnDate.workhours <
    //   task.turnaroundTime
    // ) {
    //   // NOW: Ignore if not possible in line
    //   // TODO: Use priority
    //   console.log("WARNING: Task ignored with ID:", task.id);
    //   schedule = evaluatePriority(schedule, task);
    // } else {
    // If possible (no conflict), add to task to the schedule and calculate its data
    const nextSchedule = calculateItem(task, remainingTime, progressTime);
    // console.log("calculateItem - nextSchedule", nextSchedule);
    schedule.push(nextSchedule);

    // Update info for next task
    remainingTime = nextSchedule.remainingTime;
    console.log("remainingTime", remainingTime);
    console.log("nextSchedule.startDate", nextSchedule.startDate);
    console.log("nextSchedule.endDate", nextSchedule.endDate);
    if (remainingTime > 0) progressTime = nextSchedule.endDate;
    else progressTime = OwnDate.getNextWorkday(nextSchedule.endDate);
    console.log("progressTime", progressTime);
    // console.log("remainingTime", remainingTime);
    // console.log("progressTime", progressTime);
    // }
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
 * @param {Date} progressTime
 * @returns {Schedule}
 */
function calculateItem(
  task: Task,
  remainingTime: number,
  progressTime: Date
): Schedule {
  const startDate = new Date(progressTime);
  console.log("calculateItem startDate", startDate);
  console.log("calculateItem remainingTime", remainingTime);
  // Time needed each day
  let timeSpent = calculateTimeArray(
    progressTime,
    task.turnaroundTime,
    remainingTime
  );

  let nextRemainingTime;
  if (timeSpent.length > 1) {
    nextRemainingTime = OwnDate.workhours - timeSpent[timeSpent.length - 1];
  } else if (remainingTime !== 0) {
    nextRemainingTime = remainingTime - timeSpent[timeSpent.length - 1];
  } else {
    // Handle edgecase where in one day there is no remainingTime.
    nextRemainingTime = OwnDate.workhours - timeSpent[timeSpent.length - 1];
  }

  console.log("Whole days spent with the task:", timeSpent.length - 1);
  const endDate = OwnDate.getDayAtHour(
    OwnDate.addDays(startDate, timeSpent.length - 1),
    OwnDate.dayEndHour - nextRemainingTime
  );
  console.log(
    "OwnDate.addDays(startDate, timeSpent.length - 1)",
    OwnDate.addDays(startDate, timeSpent.length - 1)
  );
  console.log("endDate", endDate);

  return new Schedule(
    task.id,
    task.name,
    task.priority,
    task.turnaroundTime,
    startDate,
    endDate,
    nextRemainingTime,
    timeSpent,
    task.deadline
  );
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
 *
 * @param {Date} startDate
 * @param {number} turnaroundTime
 * @param {number} remainingStartdayTime
 * @returns {number[]}
 */
function calculateTimeArray(
  startDate: Date,
  turnaroundTime: number,
  remainingStartdayTime: number
) {
  console.log("calculateTimeArray startDate", startDate);
  // Single-day task
  if (turnaroundTime <= remainingStartdayTime) {
    console.log(
      "turnaroundTime is smaller than the remaining at the given day."
    );
    return [turnaroundTime];
  }

  // Multi-day task (at least 2 days)
  let timeArray = [];
  let remainingTime = turnaroundTime;
  console.log("Multiday task, turnaroundTime: ", remainingTime);
  if (remainingStartdayTime !== 0) {
    timeArray.push(remainingStartdayTime);
    remainingTime -= remainingStartdayTime;
    console.log(
      "Take the remaining of the given day. Turnaround time left:",
      remainingTime
    );
  }

  const furtherDaysNeeded = Math.floor(remainingTime / OwnDate.workhours);
  const lastDayWorkHours = remainingTime % OwnDate.workhours;
  const startDay = OwnDate.getDay(startDate);
  console.log(
    "Multiday task, startDay:",
    startDay,
    "| furtherDaysNeeded: ",
    furtherDaysNeeded,
    "| lastDayWorkHours:",
    lastDayWorkHours
  );
  // If can be finished in the current week
  if (startDay + furtherDaysNeeded + (lastDayWorkHours > 0 ? 1 : 0) <= 5) {
    if (furtherDaysNeeded > 0) {
      console.log("Add full day time of ", furtherDaysNeeded, " days");
      timeArray = timeArray.concat(
        Array(furtherDaysNeeded).fill(OwnDate.workhours)
      );
    }
    if (lastDayWorkHours > 0) {
      console.log("Left some time, add it for the last day:", lastDayWorkHours);
      timeArray.push(lastDayWorkHours);
    }

    return timeArray;
  } else {
    // Goes over weeks
    const furtherTimes = Array(furtherDaysNeeded)
      .fill(OwnDate.workhours)
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
