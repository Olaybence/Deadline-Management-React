import { MdDelete } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import "./ScheduleComponent.css";
import { weekdaysMin } from "moment";
import { priorityStrings } from "../assets/data";
import { Schedule } from "../assets/models";
import { useState } from "react";
import { REMOVE_TASK } from "../reducers/taskReducer";
import { OwnDate } from "../assets/util";

export default function ScheduleComponent() {
  const dispatch = useDispatch();
  const [tag, setTag] = useState(Schedule.TAG_END_DATE);

  /**
   * List of tasks inordered.
   * It is only for storing them
   */
  let schedule = useSelector((state: any) => state.schedule);
  schedule = Schedule.orderScheduleByTag(schedule, tag);
  // TODO: Check, why is this logged twice when switch to this tab (might be normal)
  // (Also true at Tasks.jsx)
  console.log("schedule", schedule);

  const width = (w: string) => ({ width: w + "%" });
  const widths = ["4", "19", "9", "9", "12", "12", "16", "10", "8", "1"];
  if (widths.length < 9)
    console.warn("Not enought width for CSS in SchedzleComponent!");

  function deleteTask(taskId: number, rowId: number) {
    const rows = document.querySelectorAll(".schedule tr");
    rows[rowId].classList.add("collapsed");
    setTimeout(() => {
      dispatch({ type: REMOVE_TASK, id: taskId });
    }, 500);
  }

  return (
    <table className="schedule">
      <thead>
        <tr key={-1}>
          <th
            style={width(widths[0])}
            className="clickable"
            onClick={() => setTag(Schedule.TAG_TASK_ID)}
          >
            ID
            {tag === Schedule.TAG_TASK_ID && (
              <span className="sort-arrow-down"></span>
            )}
          </th>
          <th
            style={width(widths[1])}
            className="clickable"
            onClick={() => setTag(Schedule.TAG_TASK_NAME)}
          >
            Title
            {tag === Schedule.TAG_TASK_NAME && (
              <span className="sort-arrow-down"></span>
            )}
          </th>
          <th
            style={width(widths[2])}
            className="clickable"
            onClick={() => setTag(Schedule.TAG_TURNAROUND_TIME)}
          >
            Turnaround
            {tag === Schedule.TAG_TURNAROUND_TIME && (
              <span className="sort-arrow-down"></span>
            )}
          </th>
          <th
            style={width(widths[3])}
            className="clickable"
            onClick={() => setTag(Schedule.TAG_TASK_PRIORITY)}
          >
            Priority
            {tag === Schedule.TAG_TASK_PRIORITY && (
              <span className="sort-arrow-down"></span>
            )}
          </th>
          <th
            style={width(widths[4])}
            className="clickable"
            onClick={() => setTag(Schedule.TAG_START_DATE)}
          >
            Start date
            {tag === Schedule.TAG_START_DATE && (
              <span className="sort-arrow-down"></span>
            )}
          </th>
          <th
            style={width(widths[5])}
            className="clickable"
            onClick={() => setTag(Schedule.TAG_END_DATE)}
          >
            End date
            {tag === Schedule.TAG_END_DATE && (
              <span className="sort-arrow-down"></span>
            )}
          </th>
          <th style={width(widths[6])}>Time spent (h/day)</th>
          <th
            style={width(widths[7])}
            className="clickable"
            onClick={() => setTag(Schedule.TAG_DEADLINE)}
          >
            Deadline
            {tag === Schedule.TAG_DEADLINE && (
              <span className="sort-arrow-down"></span>
            )}
          </th>
          <th style={width(widths[8])}>Status</th>
          <th style={width(widths[9])}></th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((item: Schedule, rowId: number) => (
          <tr key={item.taskId}>
            <td>{item.taskId}</td>
            <td>{item.taskName}</td>
            <td>{item.turnaroundTime}</td>
            <td>{priorityStrings[item.taskPriority]}</td>
            <td>
              {OwnDate.dateFormatter(item.startDate)} (
              {weekdaysMin(item.startDate.getDay())})
            </td>
            <td>
              {OwnDate.dateFormatter(item.endDate)} (
              {weekdaysMin(new Date(item.endDate).getDay())})
            </td>
            {/* <td>{item.remainingTime}</td> */}
            <td>
              {item.timeSpent
                .slice(0, item.timeSpent.length - 1)
                .map((spentHours, i) => (
                  <span key={i}>{spentHours}; </span>
                ))}
              <span>{item.timeSpent[item.timeSpent.length - 1]}</span>
            </td>
            <td>{OwnDate.dateFormatter(item.deadline, OwnDate.dateFormat)} ({weekdaysMin(new Date(item.deadline).getDay())})</td>
            {item.endDate < item.deadline ? (
              <td>On Time</td>
            ) : (
              <td>Not enough time</td>
            )}
            <td>
              <MdDelete
                onClick={() => deleteTask(item.taskId, rowId + 1)}
                className="delete-icon"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
