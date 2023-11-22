import "./DisplayToggle.css";
import { LIST, SCHEDULE } from "../App";

export default function DisplayToggle({ displayToggle, handleToggle }) {
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
    </div>
  );
}
