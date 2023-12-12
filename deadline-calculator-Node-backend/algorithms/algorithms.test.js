import { initialTasks } from "../models/data";
import { calculateSchedule } from "./algorithms";
import { OwnDate } from "../models/util";

describe("Basic date manipulations", () => {
  test("addDays()", () => {
    const a = new Date("2023-11-15");
    const b = OwnDate.addDays(a, 5);
    expect("2023-11-15").toEqual(OwnDate.dateFormatter(b,OwnDate.dateFormat));
  });
});

describe("Graphic component test", () => {

  let schedule = calculateSchedule(initialTasks);

  if (schedule.length === 0) {
    console.warn("The schedule has 0 items. InitialTasks: ", initialTasks);
  } else if (schedule.length === 1) {
    console.log(
      "The schedule has only 1 item, not need for further tests. InitialTasks: ",
      initialTasks
    );
  }
  else {
    test("check the start-end times", () => {
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
    });

    test("Check wether the turnaroundTime equals to the timeArray sum", () => {
      schedule.forEach((item) => {
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
      });
    });

    test("Check the status - Calculated in React", () => {
      console.log('TODO');
    });
  }
});
