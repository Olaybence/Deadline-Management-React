import "./DisplayToggle.css";
import { LIST, SCHEDULE } from "../App";
import { useDispatch } from "react-redux";
import { SAVE_DATA } from "../reducers/taskReducer";
import React from "react";

export const DisplayToggle: React.FC<{
  displayToggle: string;
  handleToggle: Function;
}> = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="middle">
      <div className="radio-toggle">
        <input
          type="radio"
          id="list"
          name="displayToggle"
          checked={props.displayToggle === LIST}
          onChange={() => props.handleToggle(LIST)}
        />
        <label htmlFor="list">List</label>
        <input
          type="radio"
          id="schedule"
          name="displayToggle"
          checked={props.displayToggle === SCHEDULE}
          onChange={() => props.handleToggle(SCHEDULE)}
        />
        <label htmlFor="schedule">Schedule</label>
      </div>
      <div className="padding">
        <button
          className="save-button"
          onClick={() => dispatch({ type: SAVE_DATA })}
        >
          Save
        </button>
      </div>
    </div>
  );
};
