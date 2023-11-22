// This dataset includes a variety of problems.
let i = 0;

export const initialTasks = [
  // Small issues
  {
    name: "Problem 1",
    deadline: "2023-11-27",
    turnaroundTime: 1,
    id: i++, // 0
  },
  {
    name: "Problem 2",
    deadline: "2023-11-27",
    turnaroundTime: 2,
    id: i++, // 1
  },
  {
    name: "Problem 3",
    deadline: "2023-11-27",
    turnaroundTime: 1,
    id: i++, // 2
  },
  // Project Phases
  {
    name: "Project phase 1",
    deadline: "2023-11-23",
    turnaroundTime: 7,
    id: i++, // 3
  },
  {
    name: "Project phase 2",
    deadline: "2023-11-24",
    turnaroundTime: 12,
    id: i++, // 4
  },
  {
    name: "Project phase 3",
    deadline: "2023-11-30",
    turnaroundTime: 10,
    id: i++, // 5
  },
  // Testing
  {
    name: "Testing Phase 1 - unit testing",
    deadline: "2023-12-04",
    turnaroundTime: 30,
    id: i++, // 6
  },
  {
    name: "Testing Phase 2 - integration test",
    deadline: "2023-12-15",
    turnaroundTime: 90,
    id: i++, // 7
  },
  {
    name: "Testing Phase 3 - regression test",
    deadline: "2023-12-15",
    turnaroundTime: 90,
    id: i++, // 8
  },
];

// TODO: UPDATE!
// If up-to-date, this would cover the above task pole's solution/plan
export const initialSchedule = [
  {
    taskId: 3,
    turnaroundTime: 7,
    startDate: "2023-11-22",
    endDate: "2023-11-22",
    remainingTime: 1,
    timeSpent: [7],
    deadline: "2023-11-23",
  },
  {
    taskId: 2,
    turnaroundTime: 12,
    startDate: "2023-11-22",
    endDate: "2023-11-24",
    remainingTime: 5,
    timeSpent: [1, 8, 3],
    deadline: "2023-11-25",
  },
  {
    taskId: 0,
    turnaroundTime: 1,
    startDate: "2023-11-24",
    endDate: "2023-11-24",
    remainingTime: 4,
    timeSpent: [1],

    deadline: "2023-12-03",
  },
  {
    taskId: 1,
    turnaroundTime: 2,
    startDate: "2023-11-24",
    endDate: "2023-11-24",
    remainingTime: 2,
    timeSpent: [2],

    deadline: "2023-12-03",
  },
  {
    taskId: 2,
    turnaroundTime: 1,
    startDate: "2023-11-24",
    endDate: "2023-11-24",
    remainingTime: 1,
    timeSpent: [1],

    deadline: "2023-12-03",
  },
  {
    taskId: 5,
    turnaroundTime: 10,
    startDate: "2023-11-24",
    endDate: "2023-11-28",
    remainingTime: 7,
    timeSpent: [1,0,0,8,1],

    deadline: "2023-12-03",
  },
  {
    taskId: 6,
    turnaroundTime: 30,
    startDate: "2023-11-28",
    endDate: "2023-12-01",
    remainingTime: 1,
    timeSpent: [7,8,8,7],

    deadline: "2023-12-03",
  },
  {
    taskId: 7,
    turnaroundTime: 90,
    startDate: "2023-12-01",
    endDate: "2023-12-19",
    remainingTime: 7,
    timeSpent: [1,0,0,8,8,8,8,8,0,0,8,8,8,8,8,0,0,8,1],

    deadline: "2023-12-03",
  },
];
