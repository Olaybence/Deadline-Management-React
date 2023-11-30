import { addDays } from "../assets/util";
import "./Calendar.css";
import DateComponent from "./DateComponent";

let counter = 0;
const today = new Date();
const initialCalendarBoard = [
  [
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
  ],
  [
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
  ],
  [
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
  ],
  [
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
  ],
  [
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={addDays(today, counter++)}></DateComponent>,
  ],
];

export default function Calendar() {
  return (
    <>
      
    </>
  );
}
