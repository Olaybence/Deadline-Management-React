const { v4: uuidv4 } = require('uuid');

const priorityStrings = [
  "Minor",
  "Medium",
  "Major",
  "Emergency"
]

const initialTasks = [
  // Small issues
  {
    "name": "Problem 1",
    "deadline": "2024-11-30",
    "turnaroundTime": 1,
    "priority": 0
  },
  {
    "name": "Problem 2",
    "deadline": "2024-11-30",
    "turnaroundTime": 1,
    "priority": 3
  },
  {
    "name": "Problem 3",
    "deadline": "2024-11-30",
    "turnaroundTime": 1,
    "priority": 2
  },
  {
    "name": "Problem 4",
    "deadline": "2024-11-30",
    "turnaroundTime": 1,
    "priority": 2
  },
  {
    "name": "Problem 5",
    "deadline": "2024-11-30",
    "turnaroundTime": 1,
    "priority": 2
  },
  {
    "name": "Problem 6",
    "deadline": "2024-11-30",
    "turnaroundTime": 1,
    "priority": 2
  },
  {
    "name": "Problem 7",
    "deadline": "2024-11-30",
    "turnaroundTime": 1,
    "priority": 2
  },
  {
    "name": "Problem 8",
    "deadline": "2024-11-30",
    "turnaroundTime": 1,
    "priority": 2
  },
  {
    "name": "Problem 9",
    "deadline": "2024-11-30",
    "turnaroundTime": 2,
    "priority": 2
  },
  {
    "name": "Problem 10",
    "deadline": "2024-11-30",
    "turnaroundTime": 2,
    "priority": 0
  },
  {
    "name": "Problem 11",
    "deadline": "2024-11-30",
    "turnaroundTime": 2,
    "priority": 0
  },
  {
    "name": "Problem 12",
    "deadline": "2024-11-30",
    "turnaroundTime": 2,
    "priority": 3
  },
  {
    "name": "Problem 13",
    "deadline": "2024-11-30",
    "turnaroundTime": 2,
    "priority": 2
  },
  {
    "name": "Problem 14",
    "deadline": "2024-11-30",
    "turnaroundTime": 2,
    "priority": 2
  },
  {
    "name": "Problem 15",
    "deadline": "2024-11-30",
    "turnaroundTime": 2,
    "priority": 2
  },
  {
    "name": "Problem 16",
    "deadline": "2024-11-30",
    "turnaroundTime": 1,
    "priority": 2
  },
  {
    "name": "Problem 17",
    "deadline": "2024-11-30",
    "turnaroundTime": 2,
    "priority": 2
  },
  {
    "name": "Problem 18",
    "deadline": "2024-11-30",
    "turnaroundTime": 2,
    "priority": 2
  },
  {
    "name": "Problem 19",
    "deadline": "2024-11-30",
    "turnaroundTime": 2,
    "priority": 2
  },
  // Project Phases
  {
    "name": "Project phase 1",
    "deadline": "2024-11-27",
    "turnaroundTime": 7,
    "priority": 2
  },
  {
    "name": "Project phase 2",
    "deadline": "2024-11-29",
    "turnaroundTime": 12,
    "priority": 1
  },
  {
    "name": "Project phase 3",
    "deadline": "2024-12-04",
    "turnaroundTime": 10,
    "priority": 0
  },
  // Testing
  {
    "name": "Testing Phase 1 - unit testing",
    "deadline": "2024-12-06",
    "turnaroundTime": 30,
    "priority": 1
  },
  {
    "name": "Testing Phase 2 - integration test",
    "deadline": "2024-12-25",
    "turnaroundTime": 90,
    "priority": 1
  },
  {
    "name": "Testing Phase 3 - regression test",
    "deadline": "2024-01-30",
    "turnaroundTime": 90,
    "priority": 3
  },
  {
    "name": "Testing Phase 4 - regression test",
    "deadline": "2024-01-30",
    "turnaroundTime": 70,
    "priority": 3
  },
  {
    "name": "Testing Phase 5 - regression test",
    "deadline": "2024-01-30",
    "turnaroundTime": 69,
    "priority": 3
  },
  {
    "name": "Testing Phase 6 - regression test",
    "deadline": "2024-01-30",
    "turnaroundTime": 50,
    "priority": 3
  },
  {
    "name": "Testing Phase 7 - regression test",
    "deadline": "2024-01-30",
    "turnaroundTime": 42,
    "priority": 3
  },
  {
    "name": "Testing Phase 8 - regression test",
    "deadline": "2024-01-30",
    "turnaroundTime": 20,
    "priority": 3
  },
];

module.exports = {
  priorityStrings,
  initialTasks
};