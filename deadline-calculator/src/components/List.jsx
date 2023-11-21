import { useSelector } from "react-redux";
import "./List.css";

export default function List() {
  /**
   * List of tasks inordered.
   * It is only for storing them
   */
  const tasks = useSelector((state) => state.taskReducer.tasks);

  console.log("tasks", tasks);
  return (
    <table>
      <thead>
        <tr>
          <th>Task name</th>
          <th>Deadline</th>
          <th>Turnaround</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.name}</td>
            <td>{task.turnaroundTime}</td>
            <td>{task.deadline}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
