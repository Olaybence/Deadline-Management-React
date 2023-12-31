import { Task } from "./models";


// This dataset includes a variety of problems.
let i = 0;

export const priorityStrings: string[] = [
  "Minor",
  "Medium",
  "Major",
  "Emergency"
]

export const initialTasks: Task[] = [
  // Small issues
  {
    name: "Problem 1",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 1,
    priority: 0,
    id: i++,
  },
  {
    name: "Problem 2",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 1,
    priority: 3,
    id: i++,
  },
  {
    name: "Problem 3",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 1,
    priority: 2,
    id: i++,
  },
  {
    name: "Problem 4",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 1,
    priority: 2,
    id: i++,
  },
  {
    name: "Problem 5",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 1,
    priority: 2,
    id: i++,
  },
  {
    name: "Problem 6",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 1,
    priority: 2,
    id: i++,
  },
  {
    name: "Problem 7",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 1,
    priority: 2,
    id: i++,
  },
  {
    name: "Problem 8",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 1,
    priority: 2,
    id: i++,
  },
  {
    name: "Problem 9",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 2,
    priority: 2,
    id: i++,
  },
  {
    name: "Problem 10",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 2,
    priority: 0,
    id: i++,
  },
  {
    name: "Problem 11",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 2,
    priority: 0,
    id: i++,
  },
  {
    name: "Problem 12",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 2,
    priority: 3,
    id: i++,
  },
  {
    name: "Problem 13",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 2,
    priority: 2,
    id: i++,
  },
  {
    name: "Problem 14",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 2,
    priority: 2,
    id: i++,
  },
  {
    name: "Problem 15",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 2,
    priority: 2,
    id: i++,
  },
  {
    name: "Problem 16",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 1,
    priority: 2,
    id: i++,
  },
  {
    name: "Problem 17",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 2,
    priority: 2,
    id: i++,
  },
  {
    name: "Problem 18",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 2,
    priority: 2,
    id: i++,
  },
  {
    name: "Problem 19",
    deadline: new Date("2024-11-30"),
    turnaroundTime: 2,
    priority: 2,
    id: i++,
  },
  // Project Phases
  {
    name: "Project phase 1",
    deadline: new Date("2024-11-27"),
    turnaroundTime: 7,
    priority: 2,
    id: i++,
  },
  {
    name: "Project phase 2",
    deadline: new Date("2024-11-29"),
    turnaroundTime: 12,
    priority: 1,
    id: i++,
  },
  {
    name: "Project phase 3",
    deadline: new Date("2024-12-04"),
    turnaroundTime: 10,
    priority: 0,
    id: i++,
  },
  // Testing
  {
    name: "Testing Phase 1 - unit testing",
    deadline: new Date("2024-12-06"),
    turnaroundTime: 30,
    priority: 1,
    id: i++,
  },
  {
    name: "Testing Phase 2 - integration test",
    deadline: new Date("2024-12-25"),
    turnaroundTime: 90,
    priority: 1,
    id: i++,
  },
  {
    name: "Testing Phase 3 - regression test",
    deadline: new Date("2024-01-30"),
    turnaroundTime: 90,
    priority: 3,
    id: i++,
  },
  {
    name: "Testing Phase 4 - regression test",
    deadline: new Date("2024-01-30"),
    turnaroundTime: 70,
    priority: 3,
    id: i++,
  },
  {
    name: "Testing Phase 5 - regression test",
    deadline: new Date("2024-01-30"),
    turnaroundTime: 69,
    priority: 3,
    id: i++,
  },
  {
    name: "Testing Phase 6 - regression test",
    deadline: new Date("2024-01-30"),
    turnaroundTime: 50,
    priority: 3,
    id: i++,
  },
  {
    name: "Testing Phase 7 - regression test",
    deadline: new Date("2024-01-30"),
    turnaroundTime: 42,
    priority: 3,
    id: i++,
  },
  {
    name: "Testing Phase 8 - regression test",
    deadline: new Date("2024-01-30"),
    turnaroundTime: 20,
    priority: 3,
    id: i++,
  },
];

// TODO: UPDATE!
// If up-to-date, this would cover the above task pole's solution/plan
// export const initialSchedule = [
//   {
//     taskId: 3,
//     taskName: "",
//     turnaroundTime: 7,
//     startDate: new Date("2024-11-22"),
//     endDate: new Date("2024-11-22"),
//     remainingTime: 1,
//     timeSpent: [7],
//     deadline: new Date("2024-11-23"),
//   },
//   {
//     taskId: 2,
//     taskName: "",
//     turnaroundTime: 12,
//     startDate: new Date("2024-11-22"),
//     endDate: new Date("2024-11-24"),
//     remainingTime: 5,
//     timeSpent: [1, 8, 3],
//     deadline: new Date("2024-11-25"),
//   },
//   {
//     taskId: 0,
//     taskName: "",
//     turnaroundTime: 1,
//     startDate: new Date("2024-11-24"),
//     endDate: new Date("2024-11-24"),
//     remainingTime: 4,
//     timeSpent: [1],

//     deadline: new Date("2024-12-03"),
//   },
//   {
//     taskId: 1,
//     taskName: "",
//     turnaroundTime: 2,
//     startDate: new Date("2024-11-24"),
//     endDate: new Date("2024-11-24"),
//     remainingTime: 2,
//     timeSpent: [2],

//     deadline: new Date("2024-12-03"),
//   },
//   {
//     taskId: 2,
//     taskName: "",
//     turnaroundTime: 1,
//     startDate: new Date("2024-11-24"),
//     endDate: new Date("2024-11-24"),
//     remainingTime: 1,
//     timeSpent: [1],

//     deadline: new Date("2024-12-03"),
//   },
//   {
//     taskId: 5,
//     taskName: "",
//     turnaroundTime: 10,
//     startDate: new Date("2024-11-24"),
//     endDate: new Date("2024-11-28"),
//     remainingTime: 7,
//     timeSpent: [1,0,0,8,1],

//     deadline: new Date("2024-12-03"),
//   },
//   {
//     taskId: 6,
//     taskName: "",
//     turnaroundTime: 30,
//     startDate: new Date("2024-11-28"),
//     endDate: new Date("2024-12-01"),
//     remainingTime: 1,
//     timeSpent: [7,8,8,7],

//     deadline: new Date("2024-12-03"),
//   },
//   {
//     taskId: 7,
//     taskName: "",
//     turnaroundTime: 90,
//     startDate: new Date("2024-12-01"),
//     endDate: new Date("2024-12-19"),
//     remainingTime: 7,
//     timeSpent: [1,0,0,8,8,8,8,8,0,0,8,8,8,8,8,0,0,8,1],

//     deadline: new Date("2024-12-03"),
//   },
// ];
