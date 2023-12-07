import { dateFormatter } from "../assets/util";

export const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function DateComponent({dateStr = new Date()}) {
    const date = new Date(dateStr);
  return (
    <p>
      {dateFormatter(date)}
      ({weekdays[new Date(date).getDay()]})
    </p>
  );
}
