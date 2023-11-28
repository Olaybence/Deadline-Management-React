import { useSelector } from "react-redux";
import "./Tasks.css";
import { weekdaysMin } from "moment";
import { priorities } from "../assets/data";
import { orderTasksByID } from "../algorithms/algorithms";

export default function Tasks() {
  /**
   * List of tasks inordered.
   * It is only for storing them
   */
  let tasks = useSelector((state) => state.taskReducer.tasks);
  tasks = orderTasksByID(tasks);

  console.log("tasks", tasks);
  return (
    <table className="tasks">
      <thead>
        <tr key={-1}>
          <th>ID</th>
          <th>Task name</th>
          <th>Turnaround</th>
          <th>Priority</th>
          <th>Deadline</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.turnaroundTime}</td>
            <td>{priorities[item.priority]}</td>
            <td>{item.deadline} ({weekdaysMin(new Date(item.deadline).getDay())})</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
