import { useSelector } from "react-redux";
import "./Schedule.css";
import { weekdaysMin } from "moment";

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
          <th>turnaround time (h)</th>
          <th>start date</th>
          <th>end date</th>
          <th>remaining time (h)</th>
          <th>time spent (h/day)</th>
          <th>deadline</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((item) => (
          <tr key={item.taskId}> {/* TODO: RUNTIME ERROR: KEY WARNING */}
            <td>{item.taskId}</td>
            <td>{item.turnaroundTime}</td>
            <td>{item.startDate} ({weekdaysMin(new Date(item.startDate).getDay())})</td>
            <td>{item.endDate} ({weekdaysMin(new Date(item.endDate).getDay())})</td>
            <td>{item.remainingTime}</td>
            <td>
              {item.timeSpent.slice(0,item.timeSpent.length-1)
                .map((spentHours) => (
                  <span>{spentHours}; </span>
                  ))}
                  <span>{item.timeSpent[item.timeSpent.length-1]}</span>
            </td>
            <td>{item.deadline}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
