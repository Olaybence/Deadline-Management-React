// import { render, screen } from "@testing-library/react";
// import AddTask from "../components/AddTask";
// import { Provider } from "react-redux";
// import store from "../store/storeConfigure";
import { initialTasks } from "../assets/data";
import { calculateSchedule } from "./algorithms";

// describe("Basic date manipulations", () => {
//   test("addDays()", () => {
//     const a = new Date("2023-11-15");
//     const b = addDays(a, 5);
//     // TODO: Check if a === b
//   });
// });

// describe("Graphic component test", () => {
//     test("addTasks()", () => {
//         render(<Provider store={store}>
//                 <AddTask />
//             </Provider>);
//         const submit = screen.getByText(/Submit/i);
//         expect(submit).toBeInTheDocument();

//     });

//     // test("",()=> {});
//     // test("",()=> {});
//   });

let schedule = calculateSchedule(initialTasks);

if (schedule.length === 0) {
  console.warn("The schedule has 0 items. InitialTasks: ", initialTasks);
} else if (schedule.length === 1) {
  console.log(
    "The schedule has only 1 item, not need for further tests. InitialTasks: ",
    initialTasks
  );
} else {
  console.log("--------------------------");
  console.log("check the start-end times:");
  let prevItem = schedule[0];
  schedule.slice(1).forEach((item) => {
    if (prevItem.endDate > item.startDate) {
      console.error(
        "There is a collision, an item starts earlier than the previous was finished!"
      );
      console.error("Previous item:", prevItem);
      console.error("Current item:", item);
    }
    prevItem = item;
  });

  console.log("--------------------------");
  console.log("Check wether the turnaroundTime equals to the timeArray sum:");
  prevItem = schedule[0];
  schedule.slice(1).forEach((item) => {
    let sum = 0;
    item.timeSpent.forEach((time) => (sum += time));
    if (sum !== item.turnaroundTime) {
      console.error(
        "TurnaroundTime:",
        item.turnaroundTime,
        " IS NOT EQUAL TO the SUM of timeSpent array:",
        sum
      );
      console.error("There is an issue with item:", item);
    }
    prevItem = item;
  });

  console.log("--------------------------");
  console.log("Check the status - Calculated in React");
}
