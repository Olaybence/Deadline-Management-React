import { priorities } from "../assets/data";
import { ADD_TASK } from "../reducers/taskReducer";
import "./AddTask.css";
import { useDispatch } from "react-redux";

export default function AddTask() {
  const dispatch = useDispatch();

  function handleSubmit(event) {
    // Stop the submit to get to the not yet existing server.
    event.preventDefault();

    // console.log("handleSubmit", enteredValues);
    const fd = new FormData(event.target);
    const task = Object.fromEntries(fd.entries());
    task.turnaroundTime = Number(task.turnaroundTime);
    task.priority = Number(task.priority);

    // Store the task, and put it in our schedule.
    console.log("task", task);
    dispatch({ type: ADD_TASK, task: task });
    // tasks = calculateSchedule();
    event.target.reset();
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add new Task</h2>

      <div className="control-row">
        <div className="control text">
          <label>What is your task?</label>
          <input
            id="name"
            type="text"
            name="name"
            minLength={3}
            maxLength={30}
            required
          ></input>
        </div>
      </div>
      <div className="control-row">
        <div className="control no-margin">
          <label>Deadline: </label>
          <input id="deadline" type="date" name="deadline" required></input>
        </div>
        <div className="control no-margin">
          <label>Estimated turnaround time (in hours): </label>
          <input
            id="turnaroundTime"
            type="number"
            name="turnaroundTime"
            required
            min="0" // Can't submit negative times
          ></input>
        </div>
      </div>
      <div className="control-row">
        
        <div className="control text">
          <label htmlFor="priority">Priority:</label>
          <select id="priority" name="priority" required>
            <option value="0">{priorities[0]}</option>
            <option value="1">{priorities[1]}</option>
            <option value="2">{priorities[2]}</option>
            <option value="3">{priorities[3]}</option>
          </select>
        </div>
      </div>
      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Submit
        </button>
      </p>
    </form>
  );
}
