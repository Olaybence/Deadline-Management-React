import "./DisplayToggle.css";
import { LIST, SCHEDULE } from "../App";
import { useDispatch } from "react-redux";
import { SAVE_DATA } from "../reducers/taskReducer";

export default function DisplayToggle({ displayToggle, handleToggle }) {
  const dispatch = useDispatch();

  return (
    <div className="middle">
      <div className="radio-toggle">
        <input
          type="radio"
          id="list"
          name="displayToggle"
          checked={displayToggle === LIST}
          onChange={() => handleToggle(LIST)}
        />
        <label htmlFor="list">List</label>
        <input
          type="radio"
          id="schedule"
          name="displayToggle"
          checked={displayToggle === SCHEDULE}
          onChange={() => handleToggle(SCHEDULE)}
        />
        <label htmlFor="schedule">Schedule</label>
      </div>
      <div className="padding">
        <button className="save-button" onClick={() => dispatch({ type: SAVE_DATA })}>Save</button>
      </div>
    </div>
  );
}
