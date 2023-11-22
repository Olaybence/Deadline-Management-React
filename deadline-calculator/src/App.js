import { useState } from "react";
import "./App.css";

import AddTask from "./components/AddTask";
// import CalendarContainer from "./components/CalendarContainer";
import Header from "./components/Header";
import DisplayToggle from "./components/DisplayToggle";
import Tasks from "./components/Tasks";
import Schedule from "./components/Schedule";

export const LIST = "LIST";
export const SCHEDULE = "SCHEDULE";
function App() {
  const [displayToggle, setDisplayToggle] = useState(SCHEDULE);
  
  return (
    <>
      <Header />
      <AddTask />
      <DisplayToggle displayToggle={displayToggle} handleToggle={setDisplayToggle} />
      {displayToggle === SCHEDULE ? <Schedule /> : <Tasks/>}
    </>
  );
}

export default App;
// export default connect(mapStateToProps, mapDispatchToProps)(App);
