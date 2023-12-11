Planed API Endpoints:

Objects:
Task: {
    id: number;
    name: string;
    priority: number;
    deadline: Date;
    turnaroundTime: number;
}

Schedule {
  taskId: number;
  taskName: string;
  taskPriority: number;
  turnaroundTime: number;
  startDate: Date;
  endDate: Date;
  remainingTime: number;
  timeSpent: number[];
  deadline: Date;
}

API:
    TASKS:
        GET 
            '/api/tasks' -> all of them
            '/api/tasks/:taskid -> one task with ID
        POST
            '/api/tasks/new' -> create a task (generate an ID)
        PUT
            '/api/tasks/modify/:taskid' -> modify task with ID
        DELETE
            '/api/tasks/remove/:taskid' -> delete task with ID

    SCHEDULES:
        GET
            '/api/schedule' -> get the schedule
            '/api/schedule/:tagName' -> get the schedule ordered by tag