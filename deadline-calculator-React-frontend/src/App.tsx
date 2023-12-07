import { useState } from "react";
import "./App.css";

import AddTask from "./components/AddTask";
// import CalendarContainer from "./components/CalendarContainer";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import ScheduleComponent from "./components/ScheduleComponent";
import { DisplayToggle } from "./components/DisplayToggle";

export const LIST = "LIST";
export const SCHEDULE = "SCHEDULE";
function App() {
  const [displayToggle, setDisplayToggle] = useState(SCHEDULE);
  return (
    <>
      <Header />
      <AddTask />
      <DisplayToggle
        displayToggle={displayToggle}
        handleToggle={setDisplayToggle}
      />
      {displayToggle === SCHEDULE ? <ScheduleComponent /> : <Tasks />}
    </>
  );
}

export default App;
// export default connect(mapStateToProps, mapDispatchToProps)(App);
