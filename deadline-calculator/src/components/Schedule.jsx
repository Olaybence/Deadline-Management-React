import { useSelector } from "react-redux";
import "./Schedule.css";
import { weekdaysMin } from "moment";
import { priorities } from "../assets/data";

export default function Schedule() {
  /**
   * List of tasks inordered.
   * It is only for storing them
   */
  const schedule = useSelector((state) => state.taskReducer.schedule);

  // TODO: Check, why is this logged twice when switch to this tab (might be normal)
  // (Also true at Tasks.jsx)
  console.log("schedule", schedule);
  return (
    <table className="schedule">
      <thead>
        <tr key={-1}>
          <th>ID</th>
          <th>Title</th>
          <th>Turnaround time (h)</th>
          <th>Priority</th>
          <th>Start date</th>
          <th>End date</th>
          {/* <th>Remaining time (h)</th> */}
          <th>Time spent (h/day)</th>
          <th>Deadline</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((item) => (
          <tr key={item.taskId}>
            <td>{item.taskId}</td>
            <td>{item.taskName}</td>
            <td>{item.turnaroundTime}</td>
            <td>{priorities[item.taskPriority]}</td>
            <td>{item.startDate} ({weekdaysMin(new Date(item.startDate).getDay())})</td>
            <td>{item.endDate} ({weekdaysMin(new Date(item.endDate).getDay())})</td>
            {/* <td>{item.remainingTime}</td> */}
            <td>
              {item.timeSpent.slice(0,item.timeSpent.length-1)
                .map((spentHours,i) => (
                  <span key={i}>{spentHours}; </span>
                  ))}
                  <span>{item.timeSpent[item.timeSpent.length-1]}</span>
            </td>
            <td>{item.deadline}</td>
            <td>On Time | Not enough time</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
