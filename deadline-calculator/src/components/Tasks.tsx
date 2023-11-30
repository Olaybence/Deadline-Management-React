import { useSelector } from "react-redux";
import "./Tasks.css";
import { weekdaysMin } from "moment";
import { priorityStrings } from "../assets/data";
import { dateFormatter } from "../assets/util";
import { Task } from "../assets/models";
import { useState } from "react";

export default function Tasks() {
  const [tag, setTag] = useState(Task.TAG_ID);
  /**
   * List of tasks inordered.
   * It is only for storing them
   */
  let tasks = useSelector((state: any) => state.tasks);
  tasks = Task.orderTasksByTag(tasks, tag);

  return (
    <table className="tasks">
      <thead>
        <tr key={-1}>
          <th onClick={() => setTag(Task.TAG_ID)}>
            ID
            {tag === Task.TAG_ID && <span className="sort-arrow-down"></span>}
          </th>
          <th onClick={() => setTag(Task.TAG_NAME)}>
            Task name
            {tag === Task.TAG_NAME && <span className="sort-arrow-down"></span>}
          </th>
          <th onClick={() => setTag(Task.TAG_TURNAROUND_TIME)}>
            Turnaround
            {tag === Task.TAG_TURNAROUND_TIME && (
              <span className="sort-arrow-down"></span>
            )}
          </th>
          <th onClick={() => setTag(Task.TAG_PRIORITY)}>
            Priority
            {tag === Task.TAG_PRIORITY && <span className="sort-arrow-down"></span>}
          </th>
          <th onClick={() => setTag(Task.TAG_DEADLINE)}>
            Deadline
            {tag === Task.TAG_DEADLINE && <span className="sort-arrow-down"></span>}
          </th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((item: Task) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.turnaroundTime}</td>
            <td>{priorityStrings[item.priority]}</td>
            <td>
              {dateFormatter(item.deadline)} (
              {weekdaysMin(new Date(item.deadline).getDay())})
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
