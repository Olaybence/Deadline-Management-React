export class Task {
  id: number; // Unique identifier
  name: string;
  priority: number;
  deadline: Date; // Deadline day
  turnaroundTime: number; // Time in hours

  static TAG_ID: string = "id";
  static TAG_NAME: string = "name";
  static TAG_PRIORITY: string = "priority";
  static TAG_DEADLINE: string = "deadline";
  static TAG_TURNAROUND_TIME: string = "turnaroundTime";

  constructor(
    id: number,
    name: string,
    priority: number,
    deadline: Date | string | number,
    turnaroundTime: number
  ) {
    this.id = Number(id);
    this.name = name;
    this.priority = Number(priority);
    this.deadline = new Date(deadline);
    this.turnaroundTime = Number(turnaroundTime);
  }

  /**
   * Order the tasks by deadline
   * Compare them one-by-one and place them in the right place
   * This implements the quicksort algorithm with O(N*logN) time and n space
   */
  static orderTasksByTag(tasks: Task[], tag: string) {
    if (tasks.length === 0) return [];

    let orderedTasks = [tasks[0]];

    tasks.slice(1).forEach((task: Task) => {
      let placed = false;
      let i = 0;
      while (!placed && i < orderedTasks.length) {
        const compTask: Task = orderedTasks[i];
        if ((task as any)[tag] < (compTask as any)[tag]) {
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

    return orderedTasks;
  }
}

export class Schedule {
  taskId: number;
  taskName: string;
  taskPriority: number;
  turnaroundTime: number;
  startDate: Date;
  endDate: Date;
  remainingTime: number; // The time left AFTER the given task
  timeSpent: number[]; // The time spent each day with the given task
  deadline: Date;

  static TAG_TASK_ID: string = "taskId";
  static TAG_TASK_NAME: string = "taskName";
  static TAG_TASK_PRIORITY: string = "taskPriority";
  static TAG_TURNAROUND_TIME: string = "turnaroundTime";
  static TAG_START_DATE: string = "startDate";
  static TAG_END_DATE: string = "endDate";
  static TAG_REMAINING_TIME: string = "remainingTime";
  static TAG_TIME_SPENT: string = "timeSpent";
  static TAG_DEADLINE: string = "deadline";

  constructor(
    taskId: number,
    taskName: string,
    taskPriority: number,
    turnaroundTime: number,
    startDate: Date | string | number,
    endDate: Date | string | number,
    remainingTime: number,
    timeSpent: number[] | string[],
    deadline: Date | string | number
  ) {
    this.taskId = Number(taskId);
    this.taskName = taskName;
    this.taskPriority = Number(taskPriority);
    this.turnaroundTime = Number(turnaroundTime);
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.remainingTime = Number(remainingTime);
    this.timeSpent = timeSpent ? timeSpent.map((item) => Number(item)) : [];
    this.deadline = new Date(deadline);
  }

  /**
   * Order the tasks by deadline
   * Compare them one-by-one and place them in the right place
   * This implements the quicksort algorithm with O(N*logN) time and n space
   */
  static orderScheduleByTag(schedule: Schedule[], tag: string) {
    if (schedule.length === 0) return [];

    let orderedSchedule = [schedule[0]];

    schedule.slice(1).forEach((schedule: Schedule) => {
      let placed = false;
      let i = 0;
      while (!placed && i < orderedSchedule.length) {
        const compSchedule: Schedule = orderedSchedule[i];
        if ((schedule as any)[tag] < (compSchedule as any)[tag]) {
          orderedSchedule = orderedSchedule
            .slice(0, i)
            .concat([schedule], orderedSchedule.slice(i));
          placed = true;
        }
        i++;
      }
      if (!placed) {
        orderedSchedule.push(schedule);
      }
    });

    return orderedSchedule;
  }
}
