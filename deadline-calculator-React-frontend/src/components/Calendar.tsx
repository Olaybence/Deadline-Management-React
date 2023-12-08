import { OwnDate } from "../assets/util";
import "./Calendar.css";
import DateComponent from "./DateComponent";

let counter = 0;
const today = new Date();
const initialCalendarBoard = [
  [
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
  ],
  [
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
  ],
  [
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
  ],
  [
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
  ],
  [
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
    <DateComponent dateStr={OwnDate.addDays(today, counter++)}></DateComponent>,
  ],
];

export default function Calendar() {
  return (
    <>
      
    </>
  );
}
