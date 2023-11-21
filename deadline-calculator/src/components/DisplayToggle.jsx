import { CALENDAR, LIST } from "../App";

export default function DisplayToggle({ displayToggle }) {
  return (
    <div>
      <label htmlFor="list">List</label>
      <input
        type="radio"
        id="list"
        name="displayToggle"
        onChange={() => displayToggle(LIST)}
      />
      <label htmlFor="calendar">Calendar</label>
      <input
        type="radio"
        id="calendar"
        name="displayToggle"
        onChange={() => displayToggle(CALENDAR)}
      />
    </div>
  );
}
