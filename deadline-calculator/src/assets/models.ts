export class Task {
    id: number; // Unique identifier
    name: string;
    priority: number;
    deadline: Date; // Deadline day
    turnaroundTime: number; // Time in hours

    constructor(
        id: number,
        name: string,
        priority: number,
        deadline: Date | string | number,
        turnaroundTime: number,
    ) {
        this.id = Number(id);
        this.name = name;
        this.priority = Number(priority);
        this.deadline = new Date(deadline);
        this.turnaroundTime = Number(turnaroundTime);
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

    constructor(
        taskId: number,
        taskName: string,
        taskPriority: number,
        turnaroundTime: number,
        startDate: Date | string | number,
        endDate: Date | string | number,
        remainingTime: number,
        timeSpent: number[] | string[],
        deadline: Date | string | number,
    ) {
        this.taskId = Number(taskId);
        this.taskName = taskName;
        this.taskPriority = Number(taskPriority);
        this.turnaroundTime = Number(turnaroundTime);
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.remainingTime = Number(remainingTime);
        this.timeSpent = timeSpent.map((item) => Number(item));
        this.deadline = new Date(deadline);
    }
  }